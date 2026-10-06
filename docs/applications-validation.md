# Applications restoration — validation record

Date: 2026-10-06. Review branch only; production publication is not approved by this record.

## Executed checks

- `npm run typecheck`: passed with TypeScript strict enabled
- `npm run test:unit`: passed; see the test command output for current exact count
- `NEXT_OUTPUT=export npm run build`: passed, 54 pages generated
- `npm audit --audit-level=high`: zero vulnerabilities after updating the compatible transitive source-map-js version
- `git diff --check`: passed
- Static export inspection: 32 Applications and legacy routes have expected language and new canonical URLs
- Independent code review: fixed sparse-table amplification, deeply nested JSON pretty-print amplification, stale clipboard feedback and primary-button contrast

## Browser validation executed in CI

The local environment could not launch Chromium and its managed browser refused the development URL. A real GitHub-hosted Chromium run subsequently removed that blocker for this PR.

- Commit tested: `e264e31d1d1114eaa4a65e25d03d7e3539cba0ff`
- [Successful GitHub Pages validation run](https://github.com/Maximus203/Maximus203.github.io/actions/runs/37450255454)
- [Successful cPanel validation run](https://github.com/Maximus203/Maximus203.github.io/actions/runs/37450255266)
- `npm run test:applications`: **13 acceptance groups passed, zero failed**
- Real JPEG/PNG/WebP/PDF/ZIP downloads and signatures verified, plus CSV/JSON, image limits/error recovery, meme PNG, README Markdown/YAML, clipboard failure/races, preview privacy and URL reapproval
- 32 Applications/legacy language routes visited; all three apps checked at phone/tablet/desktop widths and in FR/EN/ZH/JA
- No uncaught browser errors or file-upload network requests observed
- Screenshots and downloaded evidence retained in the run's `application-qa` artifact. Hub desktop, French converter mobile and Japanese README mobile screenshots were also manually inspected

The first CI browser run found test-harness defects: a stale JPEG reset expectation, an alert selector also matching the Next.js route announcer, and Playwright's in-memory upload limit. They were corrected without weakening application assertions; the complete suite then passed.

The existing `test:theme` and `test:regression` scripts were made portable and updated for the new application controls. Those older full-site suites were **not** executed here; the successful E2E result applies to the new Applications suite, not every historical test.

## Reproduce on a permitted computer

```sh
npm ci
npx playwright install chromium
npm run typecheck
npm run test:unit
```

In terminal 1:

```sh
npm run dev
```

In terminal 2:

```sh
npm run test:applications
```

For an existing Chromium, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to its executable. Set `PORTFOLIO_BASE_URL` if not using port 4178. Reports and screenshots are written under `artifacts/applications/` unless `QA_OUTPUT` is supplied.

For production-export verification, run `NEXT_OUTPUT=export npm run build`, then serve `out/` with `python -m http.server 4178 --directory out --bind 127.0.0.1`, and run the same suite. PowerShell environment syntax: `$env:NEXT_OUTPUT="export"` before `npm run build`.

The existing `test:theme` and `test:regression` scripts were made portable and updated for the new application controls; they also remain browser-unexecuted here.

## Real conversion contract

| Input | Output | Limits / behavior |
| --- | --- | --- |
| PNG, JPEG, WebP, GIF, BMP | PNG, JPEG, WebP | Browser-decoded raster image; animated input becomes a still image; output encoder MIME and signatures checked |
| Same raster formats | PDF | One image per actual PDF file; not editable-document reconstruction |
| Converted image/PDF batch | ZIP | Original names sanitized; duplicates receive suffixes; actual binary outputs included |
| UTF-8 CSV | JSON records | Comma-separated RFC 4180-style quoting; unique nonempty headers, equal column counts |
| JSON object array | CSV | Flat values only; heterogeneous keys supported within bounded matrix; formula protection on by default |
| JSON | Pretty / compact JSON | Validated syntax, depth and output-size limits |
| Meme canvas | PNG | Snapshot drawn from current image and caption controls; no remote images |
| README editor | Markdown, snake YAML | Validated usernames/links, escaped content; external widgets rely on their providers |

Image limits: 30 MiB per file, 20 files, 100 MiB source batch, 150 MiB retained converted outputs, 24 million pixels and maximum edge 10,000 pixels. Meme export is bounded to a 1,600-pixel longest edge. Data input: 5 MiB; tabular conversions: 500 columns, 50,000 data rows, one million cells; bounded serialized output: 20 MiB characters and JSON depth 100. Limits reject with translated recovery messages.

Word/Excel faithful import/export, PDF→editable documents and audio/video codecs are not implemented. Google Docs is a service rather than a file format. No third-party file conversion has been introduced.

## Editorial review

- Preserve all original 14 projects; add Ndougalma, Murabbi mobile and UpgradeTech
- Restore four teaching experiences and four education entries
- Four complete locale datasets for projects, experiences, skills and education
- CV precedence: doctorate starts in 2025; TérangaDev 2024–2026. Confirm these editorial conflicts before final publication if the older site was intended instead
- UpgradeTech description is owner-reported. No assumed URL, revenue or performance metric
- Private architecture illustrations replaced with generic public-level descriptions; no internal agent names
- Future duel game is excluded

## Publication gate

A separate draft PR is the deliverable. Both existing workflows still require a push to `main` for deployment. Do not merge, push `main`, or publish until review and authorization are complete, with the browser evidence above available for review.
