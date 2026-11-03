# Real project screenshots

Captured on 2026-11-04 with Playwright CLI and visually inspected. Seven real PNGs are included across four projects. The first four total approximately 302 KB; two additional captures show a running upstream-based frontend only, and one shows the original MongoDB coursework HTML UI with an explicitly mocked browser response. No stock/AI-generated application screenshots, private records or credentials are included.

| Project / file under public/projects | Actual source and runtime | Data / limits |
|---|---|---|
| emoji-tarot/cover.png | Running React Manage Deck page with the original Express backend; 1440×1000 viewport | Existing in-memory demonstration cards |
| emoji-tarot/screen-01.png | Actual card reveal through the application's UI | Demonstration card data; not a prediction-quality claim |
| python-docker-dashboard/cover.png | Original FastAPI app/routes/static UI and domain logic, 1440×1000 | Synthetic `demo01` series supplied through the project's existing test Collection adapter; UI labels test data |
| python-docker-dashboard/mobile.png | Same real dashboard at 390×844 | Same explicit synthetic series; no live sensors, broker or MongoDB pipeline |
| ai-companion-suite/cover.png | Actual forked Vite/React frontend, from a read-only source copy with its tracked .env excluded | Frontend-only demonstration; no backend/model validation |
| ai-companion-suite/flight.png | Actual flight form opened through the source navigation | No prediction requested; no inference/accuracy/medical claim |
| project-mongodb/cover.png | Original HTML frontend served locally, with `/idname` browser response interception | Synthetic Demo Member A/B values only; no original student database, Express server or MongoDB instance used |

The dashboard was not recreated as a fake static screenshot. Its original application rendered the data; the database test adapter supplied synthetic records. This does not establish hardware, live ingestion or deployment success. The card and gallery interfaces display Demo Data labels.

The capture browser and three owned temporary runtime servers were stopped after capture. Emoji Tarot had zero console errors and two React Router future warnings; the dashboard had zero errors and warnings.

## Screenshots not fabricated

- Dorm: Android JS/Hermes export is verified, but no device/emulator execution was completed for this task.
- Navisworks MCP / BIM: plugin compilation and live model extraction were not launched for capture.
- Foundation Ontology MCP: stdio tools have no browser UI; its case study uses source-derived workflow graphics instead.
- MCP RAG: Qdrant/Ollama/provider runtime was not started.
- IoT Weather Station and separate Landslide application: live MQTT/MongoDB/hardware pipelines were not run; the companion web screenshot is attributed only to Python Docker Dashboard.
- Legacy fork/coursework exceptions are explicitly frontend-only: AI Companion Suite retains upstream attribution; project-mongodb uses a browser mock with synthetic records. No backend, model or database result is implied by those images. project-modgod is API-only in the inspected tree; README-only repositories have no app UI.

Capture feasibility was reviewed across all 15 public projects. Android emulator/adb were not found on PATH or the standard local SDK paths checked; this does not prove they are unavailable everywhere on the machine. All capture-owned servers and browser sessions were stopped after use.

Missing images can be added later after authorized model/runtime/device access. Architecture covers in cards are labelled as source-derived diagrams, never as real screenshots.
