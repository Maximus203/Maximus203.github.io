export type Player = 'X' | 'O';
export type Cell = Player | null;
export type Board = readonly [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];
export type GameStatus = 'playing' | 'won' | 'draw';
export type GameState = Readonly<{ board: Board; currentPlayer: Player; status: GameStatus; winner: Player | null }>;

export const WINNING_LINES = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]] as const;
export const otherPlayer = (player: Player): Player => player === 'X' ? 'O' : 'X';
export const emptyBoard = (): Board => [null, null, null, null, null, null, null, null, null];
export function createGame(firstPlayer: Player = 'X'): GameState { return { board: emptyBoard(), currentPlayer: firstPlayer, status: 'playing', winner: null }; }
export function winnerFor(board: readonly Cell[]): Player | null { for (const [a, b, c] of WINNING_LINES) if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a]; return null; }
export function isDraw(board: readonly Cell[]): boolean { return !winnerFor(board) && board.every(Boolean); }
export function legalMoves(board: readonly Cell[]): number[] { return board.reduce<number[]>((moves, cell, index) => { if (cell === null) moves.push(index); return moves; }, []); }
export function playMove(state: GameState, index: number): GameState {
  if (state.status !== 'playing') throw new Error('GAME_OVER');
  if (!Number.isInteger(index) || index < 0 || index > 8) throw new Error('OUT_OF_RANGE');
  if (state.board[index] !== null) throw new Error('OCCUPIED');
  const board = [...state.board] as Cell[]; board[index] = state.currentPlayer;
  const winner = winnerFor(board); const status: GameStatus = winner ? 'won' : isDraw(board) ? 'draw' : 'playing';
  return Object.freeze({ board: Object.freeze(board) as unknown as Board, currentPlayer: otherPlayer(state.currentPlayer), status, winner });
}
function minimax(board: Board, ai: Player, turn: Player, depth: number): number {
  const winner = winnerFor(board); if (winner === ai) return 10 - depth; if (winner === otherPlayer(ai)) return depth - 10;
  const moves = legalMoves(board); if (!moves.length) return 0;
  const scores = moves.map((index) => { const next = [...board] as Cell[]; next[index] = turn; return minimax(next as unknown as Board, ai, otherPlayer(turn), depth + 1); });
  return turn === ai ? Math.max(...scores) : Math.min(...scores);
}
export function bestMove(board: Board, ai: Player, turn?: Player): number | null {
  const moves = legalMoves(board); if (!moves.length || winnerFor(board) || isDraw(board)) return null;
  const xCount = board.filter((cell) => cell === 'X').length; const oCount = board.filter((cell) => cell === 'O').length;
  const activeTurn = turn ?? (xCount === oCount ? 'X' : 'O'); if (activeTurn !== ai) throw new Error('AI_OUT_OF_TURN');
  let selected = moves[0]; let bestScore = -Infinity;
  for (const index of moves) { const next = [...board] as Cell[]; next[index] = ai; const score = minimax(next as unknown as Board, ai, otherPlayer(ai), 0); if (score > bestScore) { bestScore = score; selected = index; } }
  return selected;
}
