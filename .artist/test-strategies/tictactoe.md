---
name: tictactoe-62
status: ready
scope: local browser game and pure minimax engine
---

# Validation strategy

- Unit: winning lines, draw, legal moves, immutable terminal state, invalid moves.
- Algorithm: exhaustive adversarial play proves the AI never loses as X or O.
- Browser: all four locales, keyboard move, symbol/first-player selection, AI reply, terminal result, replay, score reset.
- Responsive/accessibility: semantic grid, labelled cells, no horizontal overflow at 390px, reduced motion.
- Acceptance: no network dependency, local-only play, `npm run typecheck`, `npm run build`, and browser QA pass.
