import { describe, expect, test } from 'vitest';
import initialPieces, { PieceType } from '../../../gameLogic/initialPieces';
import { isKingInCheck } from '../../../gameLogic/kingCalculation';

describe('King tests/ isKingInCheck', () => {
  const whiteKing = 'KGE1';
  const blackKing = 'KGE8';

  test('test against pawns', () => {
    // Arrange
    // test white king
    const pieces1 = new Map<string, PieceType>([...initialPieces]);
    pieces1.set(whiteKing, { ...pieces1.get(whiteKing) as PieceType, y: 3 });
    pieces1.set('PF7', { ...pieces1.get('PF7') as PieceType, y: 4 });

    const pieces2 = new Map<string, PieceType>([...initialPieces]);
    pieces2.set(whiteKing, { ...pieces2.get(whiteKing) as PieceType, y: 3 });
    pieces2.set('PD7', { ...pieces2.get('PD7') as PieceType, y: 4 });

    // test black king
    const pieces3 = new Map<string, PieceType>([...initialPieces]);
    pieces3.set(blackKing, { ...pieces3.get(blackKing) as PieceType, y: 4 });
    pieces3.set('PF2', { ...pieces3.get('PF2') as PieceType, y: 3 });

    const pieces4 = new Map<string, PieceType>([...initialPieces]);
    pieces4.set(blackKing, { ...pieces4.get(blackKing) as PieceType, y: 4 });
    pieces4.set('PD2', { ...pieces4.get('PD2') as PieceType, y: 3 });

    // Act
    const inCheck1 = isKingInCheck(pieces1.get(whiteKing) as PieceType, pieces1);
    const inCheck2 = isKingInCheck(pieces2.get(whiteKing) as PieceType, pieces2);
    const inCheck3 = isKingInCheck(pieces3.get(blackKing) as PieceType, pieces3);
    const inCheck4 = isKingInCheck(pieces4.get(blackKing) as PieceType, pieces4);

    // Assert
    expect(inCheck1).toBe(true);
    expect(inCheck2).toBe(true);
    expect(inCheck3).toBe(true);
    expect(inCheck4).toBe(true);
  });

  describe('test white king against queen and rook', () => {
    test('checkVerticalLineToTop', () => {
      // Arrange
      const pieces1 = new Map<string, PieceType>([...initialPieces]);
      pieces1.set(whiteKing, { ...pieces1.get(whiteKing) as PieceType, y: 2 });
      pieces1.set('RH8', { ...pieces1.get('RH8') as PieceType, x: 4, y: 5 });

      const pieces2 = new Map<string, PieceType>([...initialPieces]);
      pieces2.set(whiteKing, { ...pieces2.get(whiteKing) as PieceType, y: 2 });
      pieces2.set('QD8', { ...pieces2.get('QD8') as PieceType, x: 4, y: 5 });

      // Act
      const inCheck1 = isKingInCheck(pieces1.get(whiteKing) as PieceType, pieces1);
      const inCheck2 = isKingInCheck(pieces2.get(whiteKing) as PieceType, pieces2);

      // Assert
      expect(inCheck1).toBe(true);
      expect(inCheck2).toBe(true);
    });

    test('checkVerticalLineToBottom', () => {
      // Arrange
      const pieces1 = new Map<string, PieceType>([...initialPieces]);
      pieces1.set(whiteKing, { ...pieces1.get(whiteKing) as PieceType, y: 4 });
      pieces1.set('RH8', { ...pieces1.get('RH8') as PieceType, x: 4, y: 2 });

      const pieces2 = new Map<string, PieceType>([...initialPieces]);
      pieces2.set(whiteKing, { ...pieces2.get(whiteKing) as PieceType, y: 4 });
      pieces2.set('QD8', { ...pieces2.get('QD8') as PieceType, x: 4, y: 2 });

      // Act
      const inCheck1 = isKingInCheck(pieces1.get(whiteKing) as PieceType, pieces1);
      const inCheck2 = isKingInCheck(pieces2.get(whiteKing) as PieceType, pieces2);

      // Assert
      expect(inCheck1).toBe(true);
      expect(inCheck2).toBe(true);
    });

    test('checkHorizontalLineToLeft', () => {
      // Arrange
      const pieces1 = new Map<string, PieceType>([...initialPieces]);
      pieces1.set(whiteKing, { ...pieces1.get(whiteKing) as PieceType, y: 2 });
      pieces1.set('RH8', { ...pieces1.get('RH8') as PieceType, x: 0, y: 2 });

      const pieces2 = new Map<string, PieceType>([...initialPieces]);
      pieces2.set(whiteKing, { ...pieces2.get(whiteKing) as PieceType, y: 2 });
      pieces2.set('QD8', { ...pieces2.get('QD8') as PieceType, x: 0, y: 2 });

      // Act
      const inCheck1 = isKingInCheck(pieces1.get(whiteKing) as PieceType, pieces1);
      const inCheck2 = isKingInCheck(pieces2.get(whiteKing) as PieceType, pieces2);

      // Assert
      expect(inCheck1).toBe(true);
      expect(inCheck2).toBe(true);
    });

    test('checkHorizontalLineToRight', () => {
      // Arrange
      const pieces1 = new Map<string, PieceType>([...initialPieces]);
      pieces1.set(whiteKing, { ...pieces1.get(whiteKing) as PieceType, y: 2 });
      pieces1.set('RH8', { ...pieces1.get('RH8') as PieceType, x: 7, y: 2 });

      const pieces2 = new Map<string, PieceType>([...initialPieces]);
      pieces2.set(whiteKing, { ...pieces2.get(whiteKing) as PieceType, y: 2 });
      pieces2.set('QD8', { ...pieces2.get('QD8') as PieceType, x: 7, y: 2 });

      // Act
      const inCheck1 = isKingInCheck(pieces1.get(whiteKing) as PieceType, pieces1);
      const inCheck2 = isKingInCheck(pieces2.get(whiteKing) as PieceType, pieces2);

      // Assert
      expect(inCheck1).toBe(true);
      expect(inCheck2).toBe(true);
    });
  });

  describe('test black king against queen and rook', () => {
    test('checkVerticalLineToTop', () => {
      // Arrange
      const pieces1 = new Map<string, PieceType>([...initialPieces]);
      pieces1.set(blackKing, { ...pieces1.get(blackKing) as PieceType, y: 3 });
      pieces1.set('RH1', { ...pieces1.get('RH1') as PieceType, x: 4, y: 5 });

      const pieces2 = new Map<string, PieceType>([...initialPieces]);
      pieces2.set(blackKing, { ...pieces2.get(blackKing) as PieceType, y: 3 });
      pieces2.set('QD1', { ...pieces2.get('QD1') as PieceType, x: 4, y: 5 });

      // Act
      const inCheck1 = isKingInCheck(pieces1.get(blackKing) as PieceType, pieces1);
      const inCheck2 = isKingInCheck(pieces2.get(blackKing) as PieceType, pieces2);

      // Assert
      expect(inCheck1).toBe(true);
      expect(inCheck2).toBe(true);

    });

    test('checkVerticalLineToBottom', () => {
      // Arrange
      const pieces1 = new Map<string, PieceType>([...initialPieces]);
      pieces1.set(blackKing, { ...pieces1.get(blackKing) as PieceType, y: 5 });
      pieces1.set('RH1', { ...pieces1.get('RH1') as PieceType, x: 4, y: 2 });

      const pieces2 = new Map<string, PieceType>([...initialPieces]);
      pieces2.set(blackKing, { ...pieces2.get(blackKing) as PieceType, y: 5 });
      pieces2.set('QD1', { ...pieces2.get('QD1') as PieceType, x: 4, y: 2 });

      // Act
      const inCheck1 = isKingInCheck(pieces1.get(blackKing) as PieceType, pieces1);
      const inCheck2 = isKingInCheck(pieces2.get(blackKing) as PieceType, pieces2);

      // Assert
      expect(inCheck1).toBe(true);
      expect(inCheck2).toBe(true);
    });

    test('checkHorizontalLineToLeft', () => {
      // Arrange
      const pieces1 = new Map<string, PieceType>([...initialPieces]);
      pieces1.set(blackKing, { ...pieces1.get(blackKing) as PieceType, y: 5 });
      pieces1.set('RH1', { ...pieces1.get('RH1') as PieceType, x: 0, y: 5 });

      const pieces2 = new Map<string, PieceType>([...initialPieces]);
      pieces2.set(blackKing, { ...pieces2.get(blackKing) as PieceType, y: 5 });
      pieces2.set('QD1', { ...pieces2.get('QD1') as PieceType, x: 0, y: 5 });

      // Act
      const inCheck1 = isKingInCheck(pieces1.get(blackKing) as PieceType, pieces1);
      const inCheck2 = isKingInCheck(pieces1.get(blackKing) as PieceType, pieces2);

      // Assert
      expect(inCheck1).toBe(true);
      expect(inCheck2).toBe(true);
    });

    test('checkHorizontalLineToRight', () => {
      // Arrange
      const pieces1 = new Map<string, PieceType>([...initialPieces]);
      pieces1.set(blackKing, { ...pieces1.get(blackKing) as PieceType, y: 5 });
      pieces1.set('RH1', { ...pieces1.get('RH1') as PieceType, x: 7, y: 5 });

      const pieces2 = new Map<string, PieceType>([...initialPieces]);
      pieces2.set(blackKing, { ...pieces2.get(blackKing) as PieceType, y: 5 });
      pieces2.set('QD1', { ...pieces2.get('QD1') as PieceType, x: 7, y: 5 });

      // Act
      const inCheck1 = isKingInCheck(pieces1.get(blackKing) as PieceType, pieces1);
      const inCheck2 = isKingInCheck(pieces2.get(blackKing) as PieceType, pieces2);

      // Assert
      expect(inCheck1).toBe(true);
      expect(inCheck2).toBe(true);
    });
  });

  describe('test white king against queen and bishop', () => {
    test('checkLineToRightTop', () => {
      // Arrange
      const pieces1 = new Map<string, PieceType>([...initialPieces]);
      pieces1.set(whiteKing, { ...pieces1.get(whiteKing) as PieceType, y: 2 });
      pieces1.set('BF8', { ...pieces1.get('BF8') as PieceType, x: 7, y: 5 });

      const pieces2 = new Map<string, PieceType>([...initialPieces]);
      pieces2.set(whiteKing, { ...pieces2.get(whiteKing) as PieceType, y: 2 });
      pieces2.set('QD8', { ...pieces2.get('QD8') as PieceType, x: 7, y: 5 });

      // Act
      const inCheck1 = isKingInCheck(pieces1.get(whiteKing) as PieceType, pieces1);
      const inCheck2 = isKingInCheck(pieces2.get(whiteKing) as PieceType, pieces2);

      // Assert
      expect(inCheck1).toBe(true);
      expect(inCheck2).toBe(true);
    });

    test('checkLineToLeftBottom', () => {
      // Arrange
      const pieces1 = new Map<string, PieceType>([...initialPieces]);
      pieces1.set(whiteKing, { ...pieces1.get(whiteKing) as PieceType, x: 6, y: 4 });
      pieces1.set('BF8', { ...pieces1.get('BF8') as PieceType, x: 4, y: 2 });

      const pieces2 = new Map<string, PieceType>([...initialPieces]);
      pieces2.set(whiteKing, { ...pieces2.get(whiteKing) as PieceType, x: 6, y: 4 });
      pieces2.set('QD8', { ...pieces2.get('QD8') as PieceType, x: 4, y: 2 });

      // Act
      const inCheck1 = isKingInCheck(pieces1.get(whiteKing) as PieceType, pieces1);
      const inCheck2 = isKingInCheck(pieces2.get(whiteKing) as PieceType, pieces2);

      // Assert
      expect(inCheck1).toBe(true);
      expect(inCheck2).toBe(true);
    });
    test('checkLineToLeftTop', () => {
      // Arrange
      const pieces1 = new Map<string, PieceType>([...initialPieces]);
      pieces1.set(whiteKing, { ...pieces1.get(whiteKing) as PieceType, y: 2 });
      pieces1.set('BF8', { ...pieces1.get('BF8') as PieceType, x: 1, y: 5 });

      const pieces2 = new Map<string, PieceType>([...initialPieces]);
      pieces2.set(whiteKing, { ...pieces2.get(whiteKing) as PieceType, y: 2 });
      pieces2.set('QD8', { ...pieces2.get('QD8') as PieceType, x: 1, y: 5 });

      // Act
      const inCheck1 = isKingInCheck(pieces1.get(whiteKing) as PieceType, pieces1);
      const inCheck2 = isKingInCheck(pieces2.get(whiteKing) as PieceType, pieces2);

      // Assert
      expect(inCheck1).toBe(true);
      expect(inCheck2).toBe(true);
    });

    test('checkLineToRightBottom', () => {
      // Arrange
      const pieces1 = new Map<string, PieceType>([...initialPieces]);
      pieces1.set(whiteKing, { ...pieces1.get(whiteKing) as PieceType, x: 2, y: 4 });
      pieces1.set('BF8', { ...pieces1.get('BF8') as PieceType, x: 4, y: 2 });

      const pieces2 = new Map<string, PieceType>([...initialPieces]);
      pieces2.set(whiteKing, { ...pieces2.get(whiteKing) as PieceType, x: 2, y: 4 });
      pieces2.set('QD8', { ...pieces2.get('QD8') as PieceType, x: 4, y: 2 });

      // Act
      const inCheck1 = isKingInCheck(pieces1.get(whiteKing) as PieceType, pieces1);
      const inCheck2 = isKingInCheck(pieces2.get(whiteKing) as PieceType, pieces2);

      // Assert
      expect(inCheck1).toBe(true);
      expect(inCheck2).toBe(true);
    });
  });

  describe('test black king against queen and bishop', () => {
    test('checkLineToRightTop', () => {
      // Arrange
      const pieces1 = new Map<string, PieceType>([...initialPieces]);
      pieces1.set(blackKing, { ...pieces1.get(blackKing) as PieceType, x: 2, y: 3 });
      pieces1.set('BF1', { ...pieces1.get('BF1') as PieceType, x: 4, y: 5 });

      const pieces2 = new Map<string, PieceType>([...initialPieces]);
      pieces2.set(blackKing, { ...pieces2.get(blackKing) as PieceType, x: 2, y: 3 });
      pieces2.set('QD1', { ...pieces2.get('QD1') as PieceType, x: 4, y: 5 });

      // Act
      const inCheck1 = isKingInCheck(pieces1.get(blackKing) as PieceType, pieces1);
      const inCheck2 = isKingInCheck(pieces2.get(blackKing) as PieceType, pieces2);

      // Assert
      expect(inCheck1).toBe(true);
      expect(inCheck2).toBe(true);
    });

    test('checkLineToLeftBottom', () => {
      // Arrange
      const pieces1 = new Map<string, PieceType>([...initialPieces]);
      pieces1.set(blackKing, { ...pieces1.get(blackKing) as PieceType, y: 5 });
      pieces1.set('BF1', { ...pieces1.get('BF1') as PieceType, x: 2, y: 3 });

      const pieces2 = new Map<string, PieceType>([...initialPieces]);
      pieces2.set(blackKing, { ...pieces2.get(blackKing) as PieceType, y: 5 });
      pieces2.set('QD1', { ...pieces2.get('QD1') as PieceType, x: 2, y: 3 });

      // Act
      const inCheck1 = isKingInCheck(pieces1.get(blackKing) as PieceType, pieces1);
      const inCheck2 = isKingInCheck(pieces2.get(blackKing) as PieceType, pieces2);

      // Assert
      expect(inCheck1).toBe(true);
      expect(inCheck2).toBe(true);
    });

    test('checkLineToLeftTop', () => {
      // Arrange
      const pieces1 = new Map<string, PieceType>([...initialPieces]);
      pieces1.set(blackKing, { ...pieces1.get(blackKing) as PieceType, y: 3 });
      pieces1.set('BF1', { ...pieces1.get('BF1') as PieceType, x: 2, y: 5 });

      const pieces2 = new Map<string, PieceType>([...initialPieces]);
      pieces2.set(blackKing, { ...pieces2.get(blackKing) as PieceType, y: 3 });
      pieces2.set('QD1', { ...pieces2.get('QD1') as PieceType, x: 2, y: 5 });

      // Act
      const inCheck1 = isKingInCheck(pieces1.get(blackKing) as PieceType, pieces1);
      const inCheck2 = isKingInCheck(pieces2.get(blackKing) as PieceType, pieces2);

      // Assert
      expect(inCheck1).toBe(true);
      expect(inCheck2).toBe(true);
    });

    test('checkLineToRightBottom', () => {
      // Arrange
      const pieces1 = new Map<string, PieceType>([...initialPieces]);
      pieces1.set(blackKing, { ...pieces1.get(blackKing) as PieceType, x: 2, y: 5 });
      pieces1.set('BF1', { ...pieces1.get('BF1') as PieceType, x: 5, y: 2 });

      const pieces2 = new Map<string, PieceType>([...initialPieces]);
      pieces2.set(blackKing, { ...pieces2.get(blackKing) as PieceType, x: 2, y: 5 });
      pieces2.set('QD1', { ...pieces2.get('QD1') as PieceType, x: 5, y: 2 });

      // Act
      const inCheck1 = isKingInCheck(pieces1.get(blackKing) as PieceType, pieces1);
      const inCheck2 = isKingInCheck(pieces2.get(blackKing) as PieceType, pieces2);

      // Assert
      expect(inCheck1).toBe(true);
      expect(inCheck2).toBe(true);
    });
  });
});