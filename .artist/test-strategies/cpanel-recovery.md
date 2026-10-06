---
status: ready
scope: Recover the existing cPanel publication without account or permission changes
---
# Risk-based validation
- Unit/contract: relative deployment paths only; UAPI upload status/counters and API2 extraction results, errors and embedded tar diagnostics validated. Invalid JSON/HTTP/error body must fail, even with result 1. No API request to production from unit tests.
- Integration: injected transport proves upload -> extraction -> content verification ordering, and no successful report on stale HTML/404/missing assets. No cleanup or purge on failure.
- Release: static export contains a commit marker. Verify the exact marker, localized Applications HTML and all referenced JS/CSS assets, retrying only bounded CDN propagation. Domain success is not inferred from GitHub job status.
- Security: existing environment variables only; credentials never logged; strict HTTPS, no redirects carrying auth, no new hosts/permissions. Tests use synthetic data and mocks. Paths reject traversal and arbitrary domains.
- Performance: streaming file upload via existing curl; finite network timeouts and bounded verification window. No video/Office work or content redesign.
- UI/accessibility/design/user workflows: no product UI changes; rerun current unit/typecheck/build and CI Applications browser suite; manually smoke the restored domain after publication.
- Mutation: fixtures retain result/status=1 while flipping diagnostics/errors, stale marker and asset status to ensure gates reject false success.
- Platforms: Node20+ and GitHub Linux runner; tests avoid personal machine paths. Browser live smoke follows real deployment.
- Completion: independent review, exact SHA CI, authorized merge, both deployment chains terminal, primary domain styled and interactive. Preserve failed upload for diagnosis; do not delete unrelated files.
