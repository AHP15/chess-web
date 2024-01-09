import { PieceType, Pieces } from './initialPieces';
import { PieceTypeWithPublicName } from '../src/components/Square';
import { PossibleSquare } from './utils';
import calculatePossibleMovesforRooks from './rookCalculation';
import calculatePossibleMovesforBishops from './bishopCalculation';
import calculatePossibleMovesforKnights from './knightCalculation';
import calculatePossibleMovesforPawns from './pawnCalculation';
import calculatePossibleMovesForKing, { isKingInCheck } from './kingCalculation';
import movePiece from './movePiece';

export default function calculatePossibleSquares(pieces: Pieces, piece: PieceTypeWithPublicName): PossibleSquare[] {
  let moves: PossibleSquare[] = [];

  switch (piece.info.name) {
    case 'WP':
    case 'BP':
      moves = calculatePossibleMovesforPawns(piece.info, pieces);
      break;
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
    case 'WKN':
    case 'BKN':
      moves = calculatePossibleMovesforKnights(piece.info, pieces);
      break;
    case 'WKG':
    case 'BKG':
      moves = calculatePossibleMovesForKing(piece.info, pieces);
      break;
    default: return [];
  }

  // check whether any of the possible moves calculated will result in a king check
  // if so remove it

  const finaleMoves: PossibleSquare[] = [];

  moves.forEach(square => {
    const newPieces = movePiece(new Map([...pieces]), piece, square);
    const king = piece.info.color === 'white'
      ? newPieces.get('KGE1') as PieceType
      : newPieces.get('KGE8') as PieceType;
    const inCheck = isKingInCheck(king, newPieces); // king should be passed to this function
    if (!inCheck) {
      finaleMoves.push(square);
    }
  });
  return finaleMoves;
}
