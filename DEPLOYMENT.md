# GitHub Pages deployment

Target repository: `kanatip-k/kanatip-k.github.io`.

Target website: https://kanatip-k.github.io/.

The owner explicitly authorized the complete Master Task, including public deployment. The target did not exist at the initial check; re-check before creating it and stop rather than overwrite an unexpected existing repository.

The workflow installs dependencies with Node 22/npm ci, runs TypeScript checks and a production Vite build, uploads `dist/`, then uses the official GitHub Pages deployment action. Pages uses the `workflow` build type. No PAT is in frontend or repository content; GitHub Actions uses its scoped built-in token with pages/id-token permissions.

Vite base is `/` because this is the account's root Pages repository. Project details use hash routes; `404.html` and `.nojekyll` are generated during postbuild. No custom domain or existing website setting is overwritten.

## Release verification

Before push: verify the exact staged files, check credential patterns, exclude node_modules/dist/.env and internal private audits, and validate the production build. After push: verify remote main SHA, Pages configuration, Actions result and public website in desktop/mobile browsers. A later section will record observed results; this setup description is not itself a claim that deployment has finished.

## Observed first deployment — 2026-11-04

The initial source commit `32d78c2347b69120b022d5dedbce1ffcfd99831a` deployed successfully through [Actions run 41693485157](https://github.com/kanatip-k/kanatip-k.github.io/actions/runs/41693485157). The public URL was opened in a real browser and returned the actual portfolio with the verified name and project index. GitHub initially auto-enabled legacy Pages for the root repository; it was changed to `build_type: workflow`, and the redundant legacy run was cancelled. The official build/deploy workflow succeeded.

Later source updates use the same workflow. Final release SHA, browser checks and any post-deployment limitations are recorded in the owner-facing completion report; the initial deployment record above is historical, not a claim that every later commit is already deployed.
