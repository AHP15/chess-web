import { PieceType, Pieces } from './initialPieces';
import { PossibleSquare, traverseChessLine } from './utils';


export default function calculatePossibleMovesforBishops(
  piece: PieceType, pieces: Pieces
): PossibleSquare[] {
  let moves: PossibleSquare[] = [];

  const testLineToRightTop = traverseChessLine(
    piece,
    pieces,
    (x, y) => x <= 7 && y <= 7,
    x => ++x,
    y => ++y
  );

  const testLineToLeftBottom = traverseChessLine(
    piece,
    pieces,
    (x, y) => x >= 0 && y >= 0,
    x => --x,
    y => --y
  );

  const testLineToLeftTop = traverseChessLine(
    piece,
    pieces,
    (x, y) => x >= 0 && y <= 7,
    x => --x,
    y => ++y
  );

  const testLineToRightBottom = traverseChessLine(
    piece,
    pieces,
    (x, y) => x <= 7 && y >= 0,
    x => ++x,
    y => --y
  );

  moves = [
    ...testLineToRightTop,
    ...testLineToLeftBottom,
    ...testLineToLeftTop,
    ...testLineToRightBottom
  ];

  return moves;
}