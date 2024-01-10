import { PieceTypeWithPublicName } from '../src/components/Square';
import { PieceType, Pieces } from './initialPieces';

export type PossibleSquare = {
  x: number,
  y: number,
};

type SquareInfo = {
  freeSquare: boolean,
  capturingPossible: boolean,
};

export function squareInfo(square: PossibleSquare, color: string, pieces: Pieces): SquareInfo {
  let freeSquare = true, capturingPossible = false;

  for (const piece of pieces.values()) {
    if (piece.x === square.x && piece.y === square.y) {
      freeSquare = false;
    }
    if (piece.x === square.x && piece.y === square.y && piece.color !== color) {
      capturingPossible = true;
    }
  }

  return { freeSquare, capturingPossible };
}

export type Condition = (x: number, y: number) => boolean;
export type Effect = (x: number) => number;


export function traverseChessLine(
  piece: PieceType, pieces: Pieces, condition: Condition, effectX: Effect, effectY: Effect
) {
  const moves = [];
  let X = piece.x;
  let Y = piece.y;
  let square;

  while (condition(X, Y)) {
    X = effectX(X);
    Y = effectY(Y);
    square = { x: X, y: Y };

    const { freeSquare, capturingPossible } = squareInfo(square, piece.color, pieces);

    if (freeSquare || capturingPossible) {
      if (X >= 0 && X <= 7 && Y >= 0 && Y <= 7) {
        moves.push(square);
      }
    }
    else {
      break;
    }
    if (capturingPossible) break;
  }

  return moves;
}

export function promote(pieces: Pieces, piece: PieceTypeWithPublicName): Pieces {
  for (const [k, v] of pieces.entries()) {
    if (v.name === 'WP' || v.name === 'BP') {
      if (v.y === 7 || v.y === 0) {
        pieces.set(piece.publicName, { ...piece.info, x: v.x, y: v.y });
        pieces.delete(k);
        break;
      }
    }
  }
  return pieces;
}
