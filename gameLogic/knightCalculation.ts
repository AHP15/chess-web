import { PieceType, Pieces } from './initialPieces';
import { PossibleSquare, squareInfo } from './utils';

export default function calculateMovesForKnights(piece: PieceType, pieces: Pieces): PossibleSquare[] {
  const X = piece.x
  const Y = piece.y
  const color = piece.color;

  const allPositions = [
    { x: X + 1, y: Y + 2 },
    { x: X - 1, y: Y + 2 },
    { x: X + 1, y: Y - 2 },
    { x: X - 1, y: Y - 2 },
    { x: X + 2, y: Y + 1 },
    { x: X - 2, y: Y + 1 },
    { x: X + 2, y: Y - 1 },
    { x: X - 2, y: Y - 1 },
  ];

  const moves: PossibleSquare[] = allPositions.filter(position => {
    if (position.x < 0 || position.y < 0 || position.x > 7 || position.y > 7) {
      return false;
    }

    const { freeSquare, capturingPossible } = squareInfo(
      position, color, pieces
    );
    return freeSquare || capturingPossible;
  });

  return moves;
}