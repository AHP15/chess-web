import { describe, expect, test } from 'vitest';
import initialPieces, { PieceType } from '../../../gameLogic/initialPieces';
import movePiece from '../../../gameLogic/movePiece';

describe('Test movePiece function', () => {
  test('it should move a piece', () => {
    // Arrange
    const pieces = new Map<string, PieceType>([...initialPieces]);
    const whitePawn = {
      publicName: 'PE2',
      info: pieces.get('PE2') as PieceType,
    };

    const blackPawn = {
      publicName: 'PE7',
      info: pieces.get('PE7') as PieceType,
    }

    // Act
    const newPieces1 = movePiece(pieces, whitePawn, { x: 4, y: 3 });
    const newPieces2 = movePiece(pieces, blackPawn, { x: 4, y: 4 });

    // Assert
    expect(newPieces1.get('PE2')?.y).toBe(3);
    expect(newPieces2.get('PE7')?.y).toBe(4);
  });

  test('it should detect first move', () => {
    // Arrange
    const pieces = new Map<string, PieceType>([...initialPieces]);
    const whitePawn = {
      publicName: 'PE2',
      info: pieces.get('PE2') as PieceType,
    };

    // Act
    const newPieces = movePiece(pieces, whitePawn, { x: 4, y: 3 });

    // Assert
    expect(newPieces.get('PE2')?.isFirstMove).toBe(false);
  });

  test('it should detect short castling', () => {
    // Arrange
    const pieces = new Map<string, PieceType>([...initialPieces]);
    const whiteKing = {
      publicName: 'KGE1',
      info: pieces.get('KGE1') as PieceType,
    };
    const blackKing = {
      publicName: 'KGE8',
      info: pieces.get('KGE8') as PieceType,
    };

    // Act
    const newPieces1 = movePiece(pieces, whiteKing, { x: 6, y: 0 });
    const newPieces2 = movePiece(pieces, blackKing, { x: 6, y: 7 });
    const whiteRook = newPieces1.get('RH1');
    const blackRook = newPieces2.get('RH8');

    // Assert
    expect(whiteRook?.x).toBe(5);
    expect(blackRook?.x).toBe(5);
  });

  test('it should detect long castling', () => {
    // Arrange
    const pieces = new Map<string, PieceType>([...initialPieces]);
    const whiteKing = {
      publicName: 'KGE1',
      info: pieces.get('KGE1') as PieceType,
    };
    const blackKing = {
      publicName: 'KGE8',
      info: pieces.get('KGE8') as PieceType,
    };

    // Act
    const newPieces1 = movePiece(pieces, whiteKing, { x: 2, y: 0 });
    const newPieces2 = movePiece(pieces, blackKing, { x: 2, y: 7 });
    const whiteRook = newPieces1.get('RA1');
    const blackRook = newPieces2.get('RA8');

    // Assert
    expect(whiteRook?.x).toBe(3);
    expect(blackRook?.x).toBe(3);
  });
}); 
