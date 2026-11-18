import { createRequire } from 'node:module';
import crypto from 'node:crypto';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require('/Users/koushikannamalai/.npm/_npx/31e32ef8478fbf80/node_modules/playwright');

const EXECUTABLE_PATH = [
  typeof chromium.executablePath === 'function' ? chromium.executablePath() : '',
  '/Users/koushikannamalai/Library/Caches/ms-playwright/chromium-1248/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].find((p) => p && fs.existsSync(p));
const DIST_DIR = path.resolve(process.cwd(), 'dist-public');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.gz': 'application/gzip',
};

function startStaticServer() {
  const server404s = [];
  const server = http.createServer((req, res) => {
    const reqPath = (req.url || '/').split('?')[0];
    const rel = reqPath === '/' ? 'index.html' : reqPath.replace(/^\/+/, '');
    const filePath = path.resolve(DIST_DIR, rel);
    if (!filePath.startsWith(DIST_DIR) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      server404s.push(reqPath);
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  });
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const addr = server.address();
      resolve({ server, baseUrl: `http://127.0.0.1:${addr.port}`, server404s });
    });
  });
}

function assert(cond, msg) {
  if (!cond) throw new Error(`ASSERTION FAILED: ${msg}`);
}

async function runA11yAudit(page, label) {
  return page.evaluate((lbl) => {
    const issues = [];
    const main = document.querySelector('main');
    const navs = document.querySelectorAll('nav');
    const header = document.querySelector('header');
    if (!main) issues.push(`${lbl}: missing <main> landmark`);
    if (!header) issues.push(`${lbl}: missing <header> landmark`);

    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
      .filter((el) => {
        const s = getComputedStyle(el);
        return s.display !== 'none' && s.visibility !== 'hidden';
      })
      .map((el) => ({ level: Number(el.tagName[1]), text: el.textContent?.trim().slice(0, 60) || '' }));
    const h1Count = headings.filter((h) => h.level === 1).length;
    if (h1Count !== 1) issues.push(`${lbl}: expected 1 visible h1, found ${h1Count}`);
    for (let i = 1; i < headings.length; i++) {
      if (headings[i].level > headings[i - 1].level + 1) {
        issues.push(`${lbl}: skipped heading level from h${headings[i - 1].level} ("${headings[i - 1].text}") to h${headings[i].level} ("${headings[i].text}")`);
      }
    }

    const controls = Array.from(document.querySelectorAll('input, select, textarea')).filter((el) => {
      const s = getComputedStyle(el);
      return s.display !== 'none' && s.visibility !== 'hidden' && el.getAttribute('type') !== 'hidden';
    });
    const unlabeled = [];
    for (const el of controls) {
      const id = el.id;
      const hasForLabel = id ? Boolean(document.querySelector(`label[for="${CSS.escape(id)}"]`)) : false;
      const hasWrappingLabel = Boolean(el.closest('label'));
      const hasAriaLabel = Boolean(el.getAttribute('aria-label')?.trim() || el.getAttribute('aria-labelledby')?.trim());
      if (!hasForLabel && !hasWrappingLabel && !hasAriaLabel) {
        unlabeled.push(`${el.tagName.toLowerCase()}#${id || '(no-id)'} placeholder="${el.getAttribute('placeholder') || ''}"`);
      }
    }
    if (unlabeled.length) issues.push(`${lbl}: unlabeled controls: ${unlabeled.join(', ')}`);

    const liveRegions = Array.from(document.querySelectorAll('[aria-live]')).map((el) => ({
      live: el.getAttribute('aria-live'),
      role: el.getAttribute('role'),
      text: el.textContent?.trim().slice(0, 80) || '',
    }));
    if (liveRegions.length === 0) issues.push(`${lbl}: no [aria-live] regions found`);

    const unnamedButtons = Array.from(document.querySelectorAll('button, a[href]')).filter((el) => {
      const s = getComputedStyle(el);
      if (s.display === 'none' || s.visibility === 'hidden') return false;
      const name = (el.getAttribute('aria-label') || el.textContent || '').trim();
      return name.length === 0;
    });
    if (unnamedButtons.length) issues.push(`${lbl}: ${unnamedButtons.length} visible buttons/links without accessible name`);

    function parseRgba(str) {
      const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
      if (!m) return null;
      return { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]), a: m[4] === undefined ? 1 : Number(m[4]) };
    }
    function blend(fg, bg) {
      const a = fg.a;
      return {
        r: Math.round(fg.r * a + bg.r * (1 - a)),
        g: Math.round(fg.g * a + bg.g * (1 - a)),
        b: Math.round(fg.b * a + bg.b * (1 - a)),
        a: 1,
      };
    }
    function luminance(c) {
      const ch = [c.r, c.g, c.b].map((v) => {
        const s = v / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
    }
    function contrast(c1, c2) {
      const l1 = luminance(c1);
      const l2 = luminance(c2);
      return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    }
    function effectiveBg(el) {
      let cur = el;
      const layers = [];
      while (cur && cur.nodeType === 1) {
        const bg = parseRgba(getComputedStyle(cur).backgroundColor);
        if (bg && bg.a > 0) layers.push(bg);
        if (bg && bg.a === 1) break;
        cur = cur.parentElement;
      }
      let base = { r: 255, g: 255, b: 255, a: 1 };
      for (let i = layers.length - 1; i >= 0; i--) {
        base = blend(layers[i], base);
      }
      return base;
    }

    const lowContrast = [];
    const textEls = Array.from(
      document.querySelectorAll('h1, h2, h3, p, a, button, label, th, td, li, strong, small, .g-badge, .g-pill, .g-note, .g-takeaway')
    );
    for (const el of textEls) {
      const s = getComputedStyle(el);
      if (s.display === 'none' || s.visibility === 'hidden' || Number(s.opacity) === 0) continue;
      if (el.closest('.g-skip') || el.closest('.a-skip') || el.closest('.sr-only') || el.closest('.g-sr-only')) continue;
      const hasDirectText = Array.from(el.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim().length > 0);
      if (!hasDirectText) continue;
      const fg = parseRgba(s.color);
      if (!fg) continue;
      const bg = effectiveBg(el);
      const blendedFg = fg.a < 1 ? blend(fg, bg) : fg;
      const ratio = contrast(blendedFg, bg);
      const fontSize = parseFloat(s.fontSize);
      const bold = parseInt(s.fontWeight, 10) >= 700;
      const large = fontSize >= 24 || (bold && fontSize >= 18.66);
      const minRatio = large ? 3.0 : 4.5;
      if (ratio < minRatio) {
        lowContrast.push({
          tag: el.tagName.toLowerCase(),
          cls: el.className?.toString().slice(0, 40) || '',
          text: el.textContent.trim().slice(0, 40),
          ratio: Number(ratio.toFixed(2)),
          minRatio,
          fg: s.color,
          bg: `rgb(${bg.r},${bg.g},${bg.b})`,
        });
      }
    }

    return {
      issues,
      headingsCount: headings.length,
      h1Count,
      navCount: navs.length,
      controlsCount: controls.length,
      liveRegions,
      lowContrast,
    };
  }, label);
}

async function main() {
  const { server, baseUrl: BASE_URL, server404s } = await startStaticServer();
  const browser = await chromium.launch({
    headless: true,
    executablePath: EXECUTABLE_PATH,
    args: ['--use-gl=angle', '--use-angle=swiftshader'],
  });

  const consoleErrors = [];
  const failedUrls = [];
  const pageErrors = [];
  const report = {};

  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: true });
    const page = await context.newPage();
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('response', (res) => {
      if (res.status() >= 400) failedUrls.push({ status: res.status(), url: res.url() });
    });
    page.on('pageerror', (err) => pageErrors.push(String(err)));

    // 1. Open `/`
    await page.goto(BASE_URL + '/', { waitUntil: 'networkidle' });
    await page.waitForSelector('h1');
    const title = await page.title();
    assert(title.includes('ASTER'), `Unexpected title: ${title}`);

    // Verify 3-step onboarding, above-the-fold layout, and plain-language area heading
    await page.waitForSelector('#how-it-works');
    await page.waitForSelector('.g-results .g-cards article h3');
    const firstCardBox = await page.locator('.g-results .g-cards article').first().boundingBox();
    assert(firstCardBox && firstCardBox.y < 820, `Expected first area card above the fold (<820px) at 1440x900, got y=${firstCardBox?.y}`);
    report.aboveFoldFirstCardY = Math.round(firstCardBox.y);

    const firstCardHeading = await page.locator('.g-results .g-cards article h3').first().textContent();
    assert(firstCardHeading && !firstCardHeading.startsWith('GRID '), `Card heading still starts with GRID: ${firstCardHeading}`);
    report.firstCardHeading = firstCardHeading?.trim();

    // Verify neighbourhood name search (e.g. Moss Park)
    const searchInput = page.locator('#g-search');
    await searchInput.fill('Moss Park');
    await page.waitForTimeout(150);
    const mossParkCount = await page.locator('.g-results .g-cards article').count();
    assert(mossParkCount > 0, 'Expected matches when searching neighbourhood "Moss Park"');
    const mossParkCardText = await page.locator('.g-results .g-cards article').first().textContent();
    assert(mossParkCardText && /Moss Park/i.test(mossParkCardText), 'Expected "Moss Park" neighbourhood label on matching card');
    report.mossParkCount = mossParkCount;

    // City-wide search checks (Scarborough & Etobicoke on All Toronto default)
    await searchInput.fill('Kingston');
    await page.waitForTimeout(150);
    const kingstonCount = await page.locator('.g-results .g-cards article').count();
    assert(kingstonCount > 0, 'Expected city-wide matches when searching Kingston Rd (Scarborough)');
    report.citywideKingstonCount = kingstonCount;

    await searchInput.fill('Etobicoke');
    await page.waitForTimeout(150);
    const etobicokeCount = await page.locator('.g-results .g-cards article').count();
    assert(etobicokeCount > 0, 'Expected city-wide matches when searching Etobicoke');
    report.citywideEtobicokeCount = etobicokeCount;
    await searchInput.fill('');
    await page.waitForTimeout(150);

    // 2. Community Council switch (Scarborough) & Midtown search
    await page.getByRole('button', { name: /Scarborough/i }).first().click();
    await page.waitForFunction(() => location.hash.includes('region=scarborough'));
    await page.waitForSelector('.g-results .g-cards article h3');

    await page.getByRole('button', { name: /Midtown/i }).first().click();
    await page.waitForFunction(() => location.hash.includes('region=midtown'));
    await page.waitForSelector('.g-results .g-cards article h3');

    // Search for Yonge-Eglinton / Yonge
    await searchInput.fill('Yonge');
    await page.waitForTimeout(150);
    const yongeCount = await page.locator('.g-results .g-cards article').count();
    assert(yongeCount > 0, 'Expected matches when searching Yonge in Midtown');
    await searchInput.fill('');
    await page.waitForTimeout(150);

    // 3. Select 2 areas & compare (1 Midtown + 1 Downtown cross-region)
    await page.locator('.g-results .g-cards article').first().getByRole('button').click();
    await page.waitForTimeout(150);
    await page.getByRole('button', { name: /Downtown/i }).first().click();
    await page.waitForFunction(() => location.hash.includes('region=downtown'));
    await page.waitForSelector('.g-results .g-cards article');
    await page.locator('.g-results .g-cards article').first().getByRole('button').click();
    await page.waitForTimeout(300);

    const compareCards = await page.locator('.g-comparisons article').count();
    assert(compareCards === 2, `Expected 2 compared areas, found ${compareCards}`);
    const pinnedHash = await page.evaluate(() => location.hash);
    assert(pinnedHash.includes('areas='), `Expected areas= in hash: ${pinnedHash}`);

    // 4. Reload pinned link & verify persistence
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForSelector('.g-results .g-cards article');
    await page.waitForTimeout(300);
    const compareCardsAfterReload = await page.locator('.g-comparisons article').count();
    assert(compareCardsAfterReload === 2, `Expected 2 compared areas after reload, found ${compareCardsAfterReload}`);
    report.pinnedHashReload = pinnedHash;

    // 5. Brief export JSON
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: /Export evidence & brief/i }).click(),
    ]);
    const dlPath = '/tmp/aster-brief-verify.json';
    await download.saveAs(dlPath);
    const exportedRaw = fs.readFileSync(dlPath);
    const exportedJson = JSON.parse(exportedRaw.toString('utf8'));
    assert(Array.isArray(exportedJson.areas) && exportedJson.areas.length === 2, 'Exported JSON should have 2 areas');
    const exportSha256 = crypto.createHash('sha256').update(exportedRaw).digest('hex');
    report.exportSha256 = exportSha256;

    // 6. Default interactive Toronto street map check + hide/show toggle
    await page.waitForSelector('.g-map-section .maplibregl-canvas');
    await page.waitForTimeout(450);
    const markerCount = await page.locator('.g-map-section .maplibregl-marker').count();
    assert(markerCount >= 10, `Expected offline Toronto map labels/stations on initial load, found ${markerCount}`);
    report.mapNeighbourhoodLabels = markerCount;

    const mapBtn = page.getByRole('button', { name: /(?:show|hide) area map/i }).first();
    assert(await mapBtn.isVisible(), 'Expected Hide/Show area map button to be visible');
    await mapBtn.click();
    await page.waitForTimeout(150);
    assert((await page.locator('.g-map-section').count()) === 0, 'Expected map section to hide after toggling Hide area map');
    await mapBtn.click();
    await page.waitForSelector('.g-map-section .maplibregl-canvas');

    // 6b. Inline Energy & Water evidence section check (including Water intensity metric pill)
    await page.waitForSelector('#energy-evidence');
    const waterPill = page.locator('#energy-evidence').getByRole('button', { name: /Water intensity/i });
    assert(await waterPill.isVisible(), 'Expected inline Water intensity quick metric pill to be visible on main page');
    await waterPill.click();
    await page.waitForTimeout(150);
    const energySectionText = await page.locator('#energy-evidence').textContent();
    assert(energySectionText && /Reported water intensity/i.test(energySectionText) && /m³\/m²\/year/.test(energySectionText), 'Expected Reported water intensity (m³/m²/year) distribution in inline Energy & Water section');
    report.inlineEnergyWaterVerified = true;

    // 7. WCAG / Accessibility audit on `/`
    report.a11yHome = await runA11yAudit(page, 'home');

    // Keyboard navigation test on `/`
    await page.keyboard.press('Tab');
    const firstFocusedTag = await page.evaluate(() => document.activeElement?.className || document.activeElement?.tagName);
    report.keyboardFirstFocus = firstFocusedTag;

    // 8. Print / PDF verification on `/`
    await page.emulateMedia({ media: 'print' });
    const printCheckHome = await page.evaluate(() => {
      const noPrint = document.querySelector('.g-no-print');
      const printHeader = document.querySelector('.g-print-header');
      const printProposals = document.querySelector('.g-print-proposals');
      return {
        noPrintDisplay: noPrint ? getComputedStyle(noPrint).display : null,
        printHeaderDisplay: printHeader ? getComputedStyle(printHeader).display : null,
        printProposalsDisplay: printProposals ? getComputedStyle(printProposals).display : null,
        overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      };
    });
    assert(printCheckHome.noPrintDisplay === 'none', `Expected .g-no-print hidden in print, got ${printCheckHome.noPrintDisplay}`);
    assert(printCheckHome.printHeaderDisplay !== 'none', 'Expected .g-print-header visible in print');
    assert(printCheckHome.printProposalsDisplay !== 'none', 'Expected .g-print-proposals visible in print');
    const pdfBuf = await page.pdf({ path: '/tmp/aster-brief-verify.pdf', format: 'Letter', printBackground: true });
    assert(pdfBuf.length > 5000, `PDF too small: ${pdfBuf.length}`);
    report.homePdfBytes = pdfBuf.length;
    report.printCheckHome = printCheckHome;
    await page.emulateMedia({ media: 'screen' });
    await page.screenshot({ path: '/tmp/aster-integrated-brief.png', fullPage: true });

    // 9. Mobile viewport (390x844) on `/`
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(200);
    const mobileHomeOverflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
    }));
    report.mobileHome = mobileHomeOverflow;

    // 10. Switch to 3D View (`/#view=3d`) at desktop 1440x900
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.getByRole('link', { name: /Toronto 3D/i }).first().click();
    await page.waitForSelector('.architecture h1');
    await page.waitForSelector('.a-map3d-wrap .maplibregl-canvas');
    await page.waitForTimeout(450);

    const canvasBox = await page.locator('.a-map3d-wrap canvas').first().boundingBox();
    assert(canvasBox && canvasBox.width > 100 && canvasBox.height > 100, '3D map canvas did not size properly');
    const pinCount3d = await page.locator('.a-map3d-wrap .a-map-proposal-pin').count();
    assert(pinCount3d >= 3, `Expected interactive proposal pins on Downtown 3D Street Map, found ${pinCount3d}`);
    report.proposalPins3dDowntown = pinCount3d;

    // Test 3D region switch (Yonge–Eglinton) showing real Midtown proposals, then City Hall showing Downtown proposals
    await page.getByRole('button', { name: /Yonge/i }).first().click();
    await page.waitForSelector('.a-map3d-wrap .maplibregl-canvas');
    await page.waitForTimeout(400);
    const midtownPins3d = await page.locator('.a-map3d-wrap .a-map-proposal-pin').count();
    assert(midtownPins3d >= 15, `Expected interactive proposal pins on Midtown 3D Street Map, found ${midtownPins3d}`);
    report.proposalPins3dMidtown = midtownPins3d;
    const midtownProposalList = await page.locator('.a-proposal-list').textContent();
    assert(midtownProposalList && midtownProposalList.includes('2180 YONGE ST'), 'Expected 2180 YONGE ST proposal in Midtown 3D view');

    await page.getByRole('button', { name: /City Hall/i }).first().click();
    await page.waitForSelector('.a-map3d-wrap .maplibregl-canvas');
    await page.waitForTimeout(350);
    const downtownProposalList = await page.locator('.a-proposal-list').textContent();
    assert(downtownProposalList && downtownProposalList.includes('483 BAY ST'), 'Expected 483 BAY ST proposal in City Hall 3D view');

    // Select 483 BAY ST proposal, verify Page 1 deep-link, and test 3D replacement workflow
    await page.locator('.a-proposal-list button', { hasText: '483 BAY ST' }).first().click();
    await page.waitForTimeout(150);
    const inspectHeading = await page.locator('#a-inspect-heading').textContent();
    assert(inspectHeading && inspectHeading.includes('483 BAY ST'), `Expected inspected proposal 483 BAY ST, got ${inspectHeading}`);

    const compareHref = await page.getByRole('link', { name: /Compare transit for this area on Page 1/i }).getAttribute('href');
    assert(compareHref && compareHref.includes('areas=1260_9669'), `Expected Page 1 link for 1260_9669, got ${compareHref}`);
    report.proposal3dToPage1Href = compareHref;

    await page.getByRole('button', { name: /Test 3D replacement at this site/i }).click();
    await page.waitForTimeout(150);
    // If nearest building overlaps another recorded component, select first collision-free recorded building
    if ((await page.locator('#a-dim-height').count()) === 0) {
      const buildingButtons = page.locator('.a-list button');
      const count = Math.min(15, await buildingButtons.count());
      for (let i = 0; i < count; i++) {
        await buildingButtons.nth(i).click();
        await page.waitForTimeout(100);
        const replaceBtn = page.getByRole('button', { name: /What if this building were taller or wider/i }).first();
        if (await replaceBtn.count()) {
          await replaceBtn.click();
          await page.waitForTimeout(120);
          if ((await page.locator('#a-dim-height').count()) > 0) break;
        }
      }
    }
    await page.waitForSelector('#a-dim-height');
    const curHeight = await page.locator('#a-dim-height').inputValue();
    await page.locator('#a-dim-height').fill(String(Math.min(200, Number(curHeight) + 12)));
    await page.getByRole('button', { name: /Apply replacement to 3D view/i }).click();
    await page.waitForTimeout(200);

    const replaceMsgClass = await page.locator('.a-message').getAttribute('class');
    const replaceMsgText = await page.locator('.a-message').textContent();
    assert(replaceMsgClass && !replaceMsgClass.includes('is-error'), `Expected replacement apply to succeed, got "${replaceMsgText}"`);
    const statusText = await page.locator('[aria-live="polite"]').first().textContent();
    assert(statusText && statusText.length > 0, 'Expected aria-live announcement in 3D view');

    // Keyboard camera buttons + toggle to 3D Massing Studio & back to 3D Street Map
    await page.getByRole('button', { name: /Zoom in on 3D view/i }).click();
    await page.getByRole('button', { name: /Reset camera/i }).first().click();
    await page.getByRole('button', { name: /3D Massing Studio/i }).click();
    await page.waitForSelector('.scene canvas');
    await page.waitForTimeout(250);
    await page.getByRole('button', { name: /3D Street Map/i }).click();
    await page.waitForSelector('.a-map3d-wrap .maplibregl-canvas');
    await page.waitForTimeout(250);

    const [dl3d] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: /Export comparison \(JSON\)/i }).click(),
    ]);
    await dl3d.saveAs('/tmp/aster-3d-verify.json');
    const json3d = JSON.parse(fs.readFileSync('/tmp/aster-3d-verify.json', 'utf8'));
    assert(json3d.scenario && json3d.geometryEffects, '3D export JSON missing scenario/geometryEffects');

    report.a11y3d = await runA11yAudit(page, '3d');

    // Print check on 3D view
    await page.emulateMedia({ media: 'print' });
    const pdf3dBuf = await page.pdf({ path: '/tmp/aster-3d-verify.pdf', format: 'Letter', printBackground: true });
    assert(pdf3dBuf.length > 2000, `3D PDF too small: ${pdf3dBuf.length}`);
    report.pdf3dBytes = pdf3dBuf.length;
    await page.emulateMedia({ media: 'screen' });

    // Mobile viewport (390x844) on `/#view=3d`
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(200);
    report.mobile3d = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
    }));

    // Back button test
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.getByRole('button', { name: /Back to planning/i }).click();
    await page.waitForSelector('.g-results .g-cards article');
    const backHash = await page.evaluate(() => location.hash);
    assert(!backHash.includes('view=3d'), `Back link did not clear view=3d: ${backHash}`);

    report.consoleErrors = consoleErrors;
    report.failedUrls = failedUrls;
    report.server404s = server404s;
    report.pageErrors = pageErrors;
    console.log(JSON.stringify(report, null, 2));
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
