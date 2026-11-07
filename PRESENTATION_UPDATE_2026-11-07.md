# Project showcase update

The owner selected the latest portrait preview and requested a plain account of work they have done. The current page uses `public/profile/kanatip-portrait-v2.png`, shows BIM / Foundation MCP / Landslide as three horizontal desktop cards, uses larger desktop text, and links to more work on GitHub instead of inviting email conversations. The previous portrait remains available for rollback.

Five real source-application captures were added: BIM, Foundation MCP Inspector, Landslide, Navisworks and Weather. There are now 12 images across 9 projects. The MCP Inspector capture shows an actual successful read-only tool call. BIM uses its public CASE2 sample; the sensor dashboards and standalone Navisworks frontend use synthetic data as stated in captions. These captures do not establish physical-device, full-model or end-to-end integration success.

The remaining six projects were inspected for runnable views. Two public snapshots contain only README files (`lab-kanatip`, `project-dormitory`). RAG and FastAPI-LM need unavailable runtime/service/model dependencies before a useful API capture; `project-modgod` has Express product routes with MongoDB and no frontend/docs; the Dorm Expo app did not reach a verified browser render. No generated application UI is substituted for these projects.

Local production build and 12 targeted browser checks passed, including the three-column layout, new portrait, removed email CTA, readable desktop intro, no horizontal overflow at 1440/1024/800/390 widths, and automated WCAG checks. These checks cover the portfolio presentation, not full source-project runtime behavior.
