# Kanatip Kanjanakarn — Portfolio

A bilingual collection of projects from my studies for [kanatip-k](https://github.com/kanatip-k), built with React, TypeScript, Vite, Tailwind CSS, Motion and Lucide. Target: **https://kanatip-k.github.io/**.

## Local development

Use Node.js 22 (the GitHub Actions build version) and npm.

```sh
npm ci
npm run dev
npm run typecheck
npm run build
npm run preview
```

The local implementation was also built successfully with Node.js 20.19.4. `dist/` is generated and is not committed. A `.nojekyll` file and `404.html` are added during the build. Hash-based case-study routes work with GitHub Pages without a server rewrite.

## Structure

- `src/projects.json`: 10 selected project descriptions, with Thai/English content and source evidence.
- `src/screenshots.json`: verified screenshot paths, bilingual captions and demo-data flags.
- `src/App.tsx`: navigation, sections, project filters, case-study routes and screenshot lightbox.
- `src/i18n.ts`: interface translations.
- `src/style.css`: original responsive layout, themes and reduced-motion support.
- `public/projects/`: real application and API screenshots; no stock or AI-generated project imagery. Captions distinguish live app UI, frontend-only views and synthetic/browser-mocked data.
- `.github/workflows/deploy.yml`: install, typecheck, build and GitHub Pages deployment.

## Content policy

The verified display names are Kanatip Kanjanakarn and คณาธิป กัญจนกาญจน์. The owner supplied academic records on 2026-11-07: B.Sc. in Intelligent Information Technology at Walailak University, enrollment in academic year 2024, cumulative GPAX 3.73, term results and selected coursework. Relevant academic facts are transcribed for the portfolio. The site links to GitHub for further work without a contact invitation. The original records, national identifier, address, family information and other unnecessary personal fields are not published. The current portrait is the latest shoulder-proportion preview selected by the owner. Employment history and individual project roles are not invented. See `UNKNOWN_INFORMATION.md` for remaining details.

Private repositories and their metadata are excluded. Public fork/upstream-based projects retain attribution, and incomplete integrations are identified. The two existing BIM/dorm draft PRs are linked as review branches; this portfolio does not merge them or claim they are on main.

## Evidence and documentation

Read `PROJECT_DATA.md`, `SCREENSHOT_REPORT.md`, `PORTFOLIO_AUDIT.md` and `DEPLOYMENT.md`. The reference website was studied for content depth and navigation only. Its code, copy, images, grades and personal details are not used here. This site's code and visual design were created separately.

No third-party statistics widgets, frontend tokens, analytics trackers, false resume downloads or invented proficiency percentages are included. The browser GitHub request is unauthenticated and uses public endpoints; the site remains usable if that request is rate-limited or unavailable.
