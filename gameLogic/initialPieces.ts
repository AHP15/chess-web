export type PieceType = {
  name: string,
  x: number,
  y: number,
  color: string,
  isFirstMove?: boolean,
  canPromote?: boolean,
};

export type Pieces = Map<string, PieceType>;

export const promotionPiecesForWhite: Pieces = new Map<string, PieceType>([
  ['RH1', { name: "WR", x: 0, y: 0, color: "white", isFirstMove: false }],
  ['KNG1', { name: "WKN", x: 0, y: 0, color: "white" }],
  ['BF1', { name: "WB", x: 0, y: 0, color: "white" }],
  ['QD1', { name: "WQ", x: 0, y: 0, color: "white" }],
]);

export const promotionPiecesForBlack: Pieces = new Map<string, PieceType>([
  ['RA8', { name: "BR", x: 0, y: 0, color: "black", isFirstMove: false }],
  ['KNB8', { name: "BKN", x: 0, y: 0, color: "black" }],
  ['BC8', { name: "BB", x: 0, y: 0, color: "black" }],
  ['QE8', { name: "BQ", x: 0, y: 0, color: "black" }],
]);

export default new Map<string, PieceType>([
  // white rooks
  ['RH1', { name: "WR", x: 7, y: 0, color: "white", isFirstMove: true }],
  ['RA1', { name: "WR", x: 0, y: 0, color: "white", isFirstMove: true }],
  // white knights
  ['KNG1', { name: "WKN", x: 6, y: 0, color: "white" }],
  ['KNB1', { name: "WKN", x: 1, y: 0, color: "white" }],
  // white bishops
  ['BF1', { name: "WB", x: 5, y: 0, color: "white" }],
  ['BC1', { name: "WB", x: 2, y: 0, color: "white" }],
  // white queen
  ['QD1', { name: "WQ", x: 3, y: 0, color: "white" }],
  // white king
  ['KGE1', { name: "WKG", x: 4, y: 0, color: "white", isFirstMove: true }],
  // white pawns
  ['PA2', { name: "WP", x: 0, y: 1, color: "white", isFirstMove: true, canPromote: false }],
  ['PB2', { name: "WP", x: 1, y: 1, color: "white", isFirstMove: true, canPromote: false }],
  ['PC2', { name: "WP", x: 2, y: 1, color: "white", isFirstMove: true, canPromote: false }],
  ['PD2', { name: "WP", x: 3, y: 1, color: "white", isFirstMove: true, canPromote: false }],
  ['PE2', { name: "WP", x: 4, y: 1, color: "white", isFirstMove: true, canPromote: false }],
  ['PF2', { name: "WP", x: 5, y: 1, color: "white", isFirstMove: true, canPromote: false }],
  ['PG2', { name: "WP", x: 6, y: 1, color: "white", isFirstMove: true, canPromote: false }],
  ['PH2', { name: "WP", x: 7, y: 1, color: "white", isFirstMove: true, canPromote: false }],

  // black rooks
  ['RA8', { name: "BR", x: 0, y: 7, color: "black", isFirstMove: true }],
  ['RH8', { name: "BR", x: 7, y: 7, color: "black", isFirstMove: true }],
  // black knights
  ['KNB8', { name: "BKN", x: 1, y: 7, color: "black" }],
  ['KNG8', { name: "BKN", x: 6, y: 7, color: "black" }],
  // black bishops
  ['BC8', { name: "BB", x: 2, y: 7, color: "black" }],
  ['BF8', { name: "BB", x: 5, y: 7, color: "black" }],
  // black queen
  ['QD8', { name: "BQ", x: 3, y: 7, color: "black" }],
  // black king
  ['KGE8', { name: "BKG", x: 4, y: 7, color: "black", isFirstMove: true }],
  // back pawns
  ['PA7', { name: "BP", x: 0, y: 6, color: "black", isFirstMove: true, canPromote: false }],
  ['PB7', { name: "BP", x: 1, y: 6, color: "black", isFirstMove: true, canPromote: false }],
  ['PC7', { name: "BP", x: 2, y: 6, color: "black", isFirstMove: true, canPromote: false }],
  ['PD7', { name: "BP", x: 3, y: 6, color: "black", isFirstMove: true, canPromote: false }],
  ['PE7', { name: "BP", x: 4, y: 6, color: "black", isFirstMove: true, canPromote: false }],
  ['PF7', { name: "BP", x: 5, y: 6, color: "black", isFirstMove: true, canPromote: false }],
  ['PG7', { name: "BP", x: 6, y: 6, color: "black", isFirstMove: true, canPromote: false }],
  ['PH7', { name: "BP", x: 7, y: 6, color: "black", isFirstMove: true, canPromote: false }],
]);
