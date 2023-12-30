import { describe, expect, test } from 'vitest';
import initialPieces, { PieceType } from '../../../gameLogic/initialPieces';
import { isKingInCheck } from '../../../gameLogic/kingCalculation';

describe('King tests/ isKingInCheck', () => {
  test('test king against pawns', () => {
    // Arrange
    // test white king
    const pieces1 = new Map<string, PieceType>([...initialPieces]);
    const king1 = pieces1.get('KGE1') as PieceType;
    pieces1.set('KGE1', { ...king1, y: 3 });
    pieces1.set('PF7', { ...pieces1.get('PF7') as PieceType, y: 4 });

    const pieces2 = new Map<string, PieceType>([...initialPieces]);
    const king2 = pieces2.get('KGE1') as PieceType
    pieces2.set('KGE1', { ...king2, y: 3 });
    pieces2.set('PD7', { ...pieces2.get('PD7') as PieceType, y: 4 });

    // test black king
    const pieces3 = new Map<string, PieceType>([...initialPieces]);
    const king3 = pieces3.get('KGD8') as PieceType;
    pieces3.set('KGD8', { ...king3, y: 4 });
    pieces3.set('PF2', { ...pieces3.get('PF2') as PieceType, y: 3 });

    const pieces4 = new Map<string, PieceType>([...initialPieces]);
    const king4 = pieces4.get('KGD8') as PieceType;
    pieces4.set('KGD8', { ...king4, y: 4 });
    pieces4.set('PD2', { ...pieces4.get('PD2') as PieceType, y: 3 });

    // Act
    const inCheck1 = isKingInCheck(king1, pieces1);
    const inCheck2 = isKingInCheck(king2, pieces2);
    const inCheck3 = isKingInCheck(king3, pieces3);
    const inCheck4 = isKingInCheck(king4, pieces4);

    // Assert
    expect(inCheck1).toBe(true);
    expect(inCheck2).toBe(true);
    expect(inCheck3).toBe(true);
    expect(inCheck4).toBe(true);
  });
});