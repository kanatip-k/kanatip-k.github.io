# Project research and maintenance

The site contains 15 public project entries, excluding the profile repository, the portfolio repository and three private repositories. Data was researched from the account's source snapshots, READMEs, manifests, tests, API routes and read-only GitHub API checks. Each case study carries source links in `evidence`.

Data fields include title/slug/category/technologies, bilingual description/overview/problem/objectives/features, architecture nodes/edges, API/database design, implementation notes, development analysis, tests, challenges, results, limitations, future directions and contributions. Development-process descriptions are structural source analysis, not an invented author biography. Personal roles remain unverified where no evidence was supplied.

## Included entries

Foundation Ontology MCP; Navisworks MCP; Landslide IoT Monitor; Python Docker Dashboard; IoT Weather Station; Emoji Tarot; BIM-PROJECT; MCP RAG Documentation; AI Companion Suite; FASTAPI-LM; lab-kanatip; project-dormitory; project-modgod; dorm; project-mongodb.

The six featured entries are the first six above. Forks and upstream-based work are distinguished in the data. URLs for BIM/dorm evidence use the existing review branch when the code is not on main.

## Update procedure

1. Inspect the changed public repository's source and manifests, not only its title.
2. Update both languages in `src/projects.json`, retaining exact test evidence and known limitations.
3. Confirm every source URL and preserve upstream attribution.
4. Capture genuine UI evidence where possible; update `src/screenshots.json` and provenance in `SCREENSHOT_REPORT.md`.
5. Run typecheck, build and the browser checks before pushing.

Do not add private metadata, actual student records, credentials, unsupported accuracy claims, invented personal roles or unverified live-demo links. The public GitHub API status on the site is supplemental; case-study content remains curated and versioned locally.

## Important source findings

- MCP RAG's URL-ingestion helper is a TODO placeholder despite a success-like response; its stats resource uses placeholder zeros. These are not advertised as validated features.
- project-modgod has no verified delete route, so it is not described as full CRUD.
- project-mongodb's package test script is an explicit no-test placeholder, not a passing test.
- README-only repositories are learning entries, not runnable applications.
- AI/ML UI presence does not establish model accuracy, artifact compatibility or medical suitability.
