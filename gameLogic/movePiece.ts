import { PieceType, Pieces } from './initialPieces';
import { PieceTypeWithPublicName } from '../src/components/Square';
import { PossibleSquare } from './utils';

export default function movePiece(
  pieces: Pieces,
  piece: PieceTypeWithPublicName,
  newSquare: PossibleSquare
): Pieces {

  for (const [k, p] of pieces.entries()) {
    if (p.x === newSquare.x && p.y === newSquare.y) {
      pieces.delete(k);
    }
  }

  const pieceWithNewPosition = {
    ...piece.info,
    x: newSquare.x,
    y: newSquare.y,
  };
  pieces.set(piece.publicName, pieceWithNewPosition);

  const pieceName = piece.info.name;

  // See if this move is castling moving
  // If so: move the rook too
  if ((pieceName === 'WKG' || pieceName === 'BKG') && piece.info.isFirstMove) {

    const shortCastlingXvalue = 6;
    const yValueForWhiteKing = 0;

    const longCastlingXvalue = 2;
    const yValueForBlackKing = 7;

    // it is a short castling for white king
    if (newSquare.x === shortCastlingXvalue && newSquare.y === yValueForWhiteKing) {
      pieces.set('RH1', { ...pieces.get('RH1') as PieceType, x: newSquare.x - 1 });
    }

    // it is a long castling for white king
    else if (newSquare.x === longCastlingXvalue && newSquare.y === yValueForWhiteKing) {
      pieces.set('RA1', { ...pieces.get('RA1') as PieceType, x: newSquare.x + 1 });
    }

    // it is a short castling for black king
    else if (newSquare.x === shortCastlingXvalue && newSquare.y === yValueForBlackKing) {
      pieces.set('RH8', { ...pieces.get('RH8') as PieceType, x: newSquare.x - 1 });
    }

    // it is a long castling for black king
    else if (newSquare.x === longCastlingXvalue && newSquare.y === yValueForBlackKing) {
      pieces.set('RA8', { ...pieces.get('RA8') as PieceType, x: newSquare.x + 1 });
    }
  }

  switch (pieceName) {
    case 'WR':
    case 'BR':
    case 'WKG':
    case 'BKG':
      pieceWithNewPosition.isFirstMove = false;
      break;
    case 'WP':
    case 'BP':
      pieceWithNewPosition.isFirstMove = false;
      if (pieceWithNewPosition.y === 7 || pieceWithNewPosition.y === 0) {
        pieceWithNewPosition.canPromote = true;
      }
  }

  return pieces;
}
