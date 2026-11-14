import tempfile
import unittest
from pathlib import Path
from scripts.resumable_download import fetch

class DownloadTests(unittest.TestCase):
    def run_download(self, mode):
        calls=[]
        def request(url, body, headers, *, head=False, start=None, validator='', http1=False):
            calls.append((head,start,http1))
            etag='"b"' if mode=='changed' and len(calls)>2 else '"a"'
            if head:
                headers.write_text('HTTP/1.1 200 OK\nContent-Length: 6\nAccept-Ranges: bytes\nETag: '+etag+'\n\n');body.write_bytes(b'');return 0
            if mode=='ignored':
                headers.write_text('HTTP/1.1 200 OK\nETag: '+etag+'\n\n');body.write_bytes(b'abcdef');return 0
            if mode=='wrong-range':
                headers.write_text('HTTP/1.1 206 Partial\nETag: '+etag+'\nContent-Range: bytes 2-5/6\n\n');body.write_bytes(b'cdef');return 0
            headers.write_text(f'HTTP/1.1 206 Partial\nETag: {etag}\nContent-Range: bytes {start}-5/6\n\n')
            first=len(calls)==2
            body.write_bytes(b'abc' if first else (b'abcdef' if start==0 else b'def'))
            return 18 if first else 0
        with tempfile.TemporaryDirectory() as temp:
            target=Path(temp)/'file'
            if mode=='wrong-range':
                with self.assertRaises(ValueError):fetch('https://example.test/file',target,request=request)
                self.assertFalse(target.exists())
            else:
                fetch('https://example.test/file',target,request=request)
                self.assertEqual(target.read_bytes(),b'abcdef')
        return calls
    def test_partial_resumes_and_falls_back(self):
        calls=self.run_download('partial');self.assertIn((False,3,True),calls)
    def test_changed_validator_restarts(self):
        calls=self.run_download('changed');self.assertIn((False,0,True),calls)
    def test_ignored_range_replaces_without_append(self):self.run_download('ignored')
    def test_incorrect_range_never_appended(self):self.run_download('wrong-range')
    def test_non_https_rejected(self):
        with self.assertRaises(ValueError):fetch('http://example.test/file',Path('/tmp/not-created'))

if __name__=='__main__':unittest.main()
