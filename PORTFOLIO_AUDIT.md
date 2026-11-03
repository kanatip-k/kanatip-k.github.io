# Portfolio implementation and QA audit

## Reference study

Studied https://siwat2614.github.io/ through a real browser at 1440×1000 and 390×844. Inspected navigation, hero, about, education/academic details, skills, project evidence, working approach and contact. Exercised the mobile menu and Thai/English switch; English headings and document language changed successfully. Both viewport widths had no horizontal overflow. The reference places project scope, roles, evidence and limits close to each project; this informed content depth, not copied code or assets.

The new implementation uses an original dark olive/lime systems-oriented layout, a searchable 15-project index, individual hash-routed case studies, an optional light theme and genuine application captures. Reference-owner names, contact details, grades and project claims are not imported.

## Implemented

React/TypeScript/Vite/Tailwind/Motion/Lucide; Thai/English persistence; dark/light persistence; responsive navigation with active sections; source-derived workflow diagrams; six featured projects; 15 public project detail pages; search/category/technology filters; lazy images; accessible screenshot dialog; GitHub public metadata availability; reduced-motion support; skip link; SEO/OG metadata; favicon; sitemap/robots; custom 404 handling; GitHub Pages Actions workflow.

## Checks actually completed locally

- TypeScript compilation and production build passed. Vendor splitting removed the original >500 KB chunk warning; the largest final chunk is about 223 KB uncompressed.
- Real-browser checks passed for six featured cards, 15 directory cards, Thai default, English switching, light theme state, search, empty-state reset, technology/category filters, 15 distinct detail routes and their evidence links.
- Screenshot dialog opened and closed with Escape; back navigation returned to the home projects.
- Mobile navigation opened and closed after selection; desktop and 390-pixel mobile layouts and mobile case-study view had no horizontal overflow.
- All rendered screenshot covers and the verified GitHub avatar loaded successfully.
- An unknown project slug rendered the 404 screen.
- Reduced-motion mode disabled the orbit animation.
- Automated WCAG A/AA/2.1 AA tagged checks on the tested mobile home state reported zero violations and 20 passing rules. This is not a claim of complete manual accessibility certification.
- No JavaScript page errors occurred during the browser check suite.

Project checks from this task/migration: Foundation MCP 11 tests; Dashboard 11 tests and 18 subtests; Emoji Tarot typechecks, client build, three API smoke checks and actual UI capture. Compose checks are distinguished from running hardware pipelines. Remaining project runtime limits are included in the case studies.

## Deliberate omissions

No guessed university/degree/GPA, work history, phone/email/LinkedIn, individual contribution percentages, fake resume PDF or unsupported demo links. Education/resume details are recorded in `UNKNOWN_INFORMATION.md`; production presents only the confirmed GitHub contact and academic-project context. No private repository metadata or provider/GitHub token is embedded.

Deployment and live checks are recorded separately in `DEPLOYMENT.md` after publishing. A successful local build alone is not called a successful public deployment.
