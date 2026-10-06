---
status: ready
scope: Restore functional browser-local applications and multilingual portfolio content
---
# Acceptance and risk plan
Architecture: Next.js App Router static export, React client workbenches; no server upload or account mutation.

1. Unit: conversion filename/MIME consistency, CSV quoting/round trip, README escaping, URL validation, language dictionary completeness. Risk: corrupt files, injection, fake formats.
2. Integration: repeated uploads and option changes clear stale downloads; bad files show actionable errors; clipboard rejection has a fallback; old paths still reach applications. Risk: state regressions.
3. Contract: no remote API owned here; exported download bytes/MIME and Markdown/workflow are the public contracts. Verify PNG/JPEG/WebP/PDF signatures and ZIP contents.
4. E2E: image batch→options→download, meme upload→edit→PNG, README profile→skills→Markdown/workflow download; execute in real Chromium. Check invalid/repeated flows, reset and route navigation.
5. Security: local file inputs never uploaded, generated user input cannot execute HTML/JS, unsafe links rejected, external service preview opt-in. No credentials or private source content.
6. Performance: static build, lazy heavy conversion dependencies; large-file limits and interaction state prevent browser freeze. No fabricated timing guarantees.
7. Mutation: deliberately vary expected output signatures / hostile URL fixture assertions to establish sensitive assertions fail; comprehensive mutation framework out of scope.
8. UI: categorized searchable Applications hub, clear supported/unsupported format labels, full-width workspaces with mobile stacking.
9. Design system: reuse portfolio tokens, authentic application/technology icons, light/dark and reduced motion.
10. Visitor workflows: browsing portfolio vs using application; no account required. Preserve project inventory and teaching history with supplied CV precedence.
11. Platforms: desktop 1440px, phone 390px, tablet 768px; no horizontal overflow, file APIs supported and failure visible.
12. Accessibility: native labeled controls, keyboard navigation, visible focus, status/alert regions, sensible headings, readable contrast.

Release gate: typecheck + static export build + pure unit suite + browser functional suite; report skipped or blocked checks accurately. Separate draft PR only; no main push, merge or deployment. Historical code is reference material, not automatic proof.
