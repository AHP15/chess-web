import { PieceType, Pieces } from './initialPieces';
import { PossibleSquare, squareInfo } from './utils';

const WHITE_COLOR = 'white';

export default function calculatePossibleMovesforPawns(piece: PieceType, pieces: Pieces): PossibleSquare[] {
  const moves: PossibleSquare[] = [];
  const { x, y, color } = piece;
  let square: PossibleSquare;

  if (color === WHITE_COLOR && y === 4) { } // check for en passant (white to capture)
  if (color !== WHITE_COLOR && y === 3) { } // check for en passant (black to capture)

  // For each pawn we have a maximum of 4 squares (exluding en passant)
  const X1 = x + 1;
  const X2 = x - 1;
  const Y1 = color === WHITE_COLOR ? y + 1 : y - 1;
  const Y2 = color === WHITE_COLOR ? y + 2 : y - 2;

  // square 1
  square = { x: x, y: Y1 };
  //condition for square 1
  if (squareInfo(square, piece.color, pieces).freeSquare) {
    moves.push(square);

    //square 2
    square = { x: x, y: Y2 };
    //condition for square 1
    if (piece.isFirstMove && squareInfo(square, piece.color, pieces).freeSquare) {
      moves.push(square);
    }
  }

  //square 3
  square = { x: X1, y: Y1 };
  //condition for square 1
  if (squareInfo(square, piece.color, pieces).capturingPossible) {
    moves.push(square);
  }

  //square 4
  square = { x: X2, y: Y1 };
  //condition for square 1
  if (squareInfo(square, piece.color, pieces).capturingPossible) {
    moves.push(square);
  }


  return moves;
}