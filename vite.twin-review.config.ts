import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({base:'./',publicDir:false,plugins:[react()],build:{manifest:true,outDir:'dist-twin-review',rollupOptions:{input:'twin-review.html'}}});
