import { Pieces } from './initialPieces';
import { PieceTypeWithPublicName } from '../src/components/Square';
import { PossibleSquare } from './utils';
import calculatePossibleMovesforRooks from './rookCalculation';
import calculatePossibleMovesforBishops from './bishopCalculation';

export default function calculatePossibleSquares(pieces: Pieces, piece: PieceTypeWithPublicName): PossibleSquare[] {
  let moves: PossibleSquare[] = [];

  switch (piece.info.name) {
    case 'WR':
    case 'BR':
      moves = calculatePossibleMovesforRooks(piece.info, pieces);
      break;
    case 'WB':
    case 'BB':
      moves = calculatePossibleMovesforBishops(piece.info, pieces);
      break;
    case 'WQ':
    case 'BQ':
      moves = [
        ...calculatePossibleMovesforRooks(piece.info, pieces),
        ...calculatePossibleMovesforBishops(piece.info, pieces)
      ];
      break;
    default: return [];
  }

  return moves;
}
