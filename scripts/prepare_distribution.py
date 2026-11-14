"""Prepare a reviewed allowlist for a dedicated public repository; never copy the workspace."""
from __future__ import annotations
import json
import shutil
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
TARGET=ROOT/'release/distribution'


def prepare()->None:
    """Package the site, isolated reusable builder and publication workflows."""
    TARGET.mkdir(parents=True,exist_ok=True)
    site=TARGET/'site'
    # Keep content-hashed bundles needed by already-open tabs after a release.
    # Immutable planning snapshots are retained by package_public as well.
    shutil.copytree(ROOT/'dist-public',site,dirs_exist_ok=True)
    builder=TARGET/'builder'
    builder.mkdir(exist_ok=True)
    files=['scripts/build_transport.py','scripts/acquire_transport.py','tests/test_transport.py','tests/transport.test.mjs','tests/planning-startup.test.mjs','docs/public-transportation.md','scripts/check_public_boundary.py','scripts/gta_adapters.py','scripts/gta_adapters.json','tests/test_gta_adapters.py','docs/gta-source-qualification.md','docs/gta-qualification-matrix.json','scripts/gta_source_registry.json','scripts/acquire_gta.py','scripts/build_gta.py','scripts/refresh_gta.py','scripts/publish_gta_r2.py','scripts/gta_contracts.json','scripts/gta_scope.json','tests/test_gta.py','tests/gta-gateway.test.mjs','tests/gta-worker.test.mjs','deploy/gta-data/worker.mjs','deploy/gta-data/wrangler.jsonc','scripts/acquire_planning.py','scripts/build_planning.py','scripts/refresh_planning.py','scripts/package_public.py','scripts/planning_contracts.json',
           'tests/test_planning.py','tests/planning-spatial.test.mjs','tests/planning-worker.test.mjs','tests/planning-export.test.mjs','src/vite-env.d.ts','index.html','tsconfig.json','package-lock.json']
    files += [p.relative_to(ROOT).as_posix() for p in (ROOT/'src/planning').iterdir() if p.is_file()]
    for name in files:
        dest=builder/name;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(ROOT/name,dest)
    (builder/'src/main.tsx').write_text("import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport PlanningExplorer from './planning/PlanningExplorer';\nimport 'maplibre-gl/dist/maplibre-gl.css';\nReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><PlanningExplorer/></React.StrictMode>);\n")
    (builder/'vite.config.ts').write_text("import {defineConfig} from 'vite';\nimport react from '@vitejs/plugin-react';\nexport default defineConfig({base:'./',publicDir:false,plugins:[react()],build:{outDir:'dist-public',manifest:true}});\n")
    package=json.loads((ROOT/'package.json').read_text())
    package['scripts']={'build:public':'tsc -b && vite build --mode public && .venv/bin/python scripts/package_public.py && .venv/bin/python scripts/check_public_boundary.py',
                        'test:planning':'node --experimental-strip-types --test tests/planning-spatial.test.mjs tests/planning-export.test.mjs',
                        'test:transport':'node --experimental-strip-types --test tests/transport.test.mjs',
                        'test:worker':'node --experimental-strip-types --test tests/planning-worker.test.mjs', 'test:gta':'node --experimental-strip-types --test tests/gta-gateway.test.mjs tests/gta-worker.test.mjs tests/planning-startup.test.mjs'}
    (builder/'package.json').write_text(json.dumps(package,indent=2)+'\n')
    (builder/'requirements.txt').write_text('numpy==2.2.6\nshapely==2.1.2\npyproj==3.7.2\n')
    (TARGET/'.gitignore').write_text('builder/node_modules\nbuilder/.venv\nbuilder/data/\nbuilder/public/\nbuilder/dist-public/\n**/__pycache__/\n**/*.pyc\n**/*.tsbuildinfo\n')
    workflows=TARGET/'.github/workflows';workflows.mkdir(parents=True,exist_ok=True)
    shutil.copy2(ROOT/'docs/planning-pages-workflow.yml',workflows/'pages.yml')
    shutil.copy2(ROOT/'docs/planning-refresh-workflow.yml',workflows/'refresh.yml')
    shutil.copy2(ROOT/'docs/planning-validation-workflow.yml',workflows/'validation.yml')
    shutil.copy2(ROOT/'docs/planning-public-readme.md',TARGET/'README.md')
    shutil.copy2(ROOT/'docs/gta-implementation.md',TARGET/'GTA.md')
    shutil.copy2(ROOT/'docs/planning-code-license.txt',TARGET/'LICENSE')
    shutil.copy2(ROOT/'docs/planning-release.md',TARGET/'VALIDATION.md')
    shutil.copy2(ROOT/'docs/planning-third-party-notices.md',TARGET/'THIRD_PARTY_NOTICES.md')
    shutil.copy2(ROOT/'docs/planning-feedback.md',TARGET/'FEEDBACK.md')
    shutil.copy2(ROOT/'docs/planning-demo.md',TARGET/'DEMO.md')
    images=TARGET/'docs/images';images.mkdir(parents=True,exist_ok=True)
    for name in ('planning-desktop.jpg','planning-evidence.jpg','planning-mobile.jpg'):
        shutil.copy2(ROOT/'docs/planning-images'/name,images/name)
    templates=TARGET/'.github/ISSUE_TEMPLATE';templates.mkdir(parents=True,exist_ok=True)
    shutil.copy2(ROOT/'docs/planning-feedback-template.yml',templates/'usability.yml')
    print(json.dumps({'directory':str(TARGET),'allowlisted_builder_files':len(files)+4,'site':'validated static build only'}))

if __name__=='__main__':prepare()
