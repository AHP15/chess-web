import { describe, expect, test } from 'vitest';
import initialPieces, { PieceType } from '../../../gameLogic/initialPieces';
import calculateMovesforKnights from '../../../gameLogic/knightCalculation';

describe('Knight test', () => {
  test('it should calculate for knights', () => {
    // Arrange
    const Knight1 = initialPieces.get('KNG1') as PieceType; // left white knight
    const Knight2 = initialPieces.get('KNB1') as PieceType; // right white knight
    const knight3 = initialPieces.get('KNB8') as PieceType; // right black knight
    const knight4 = initialPieces.get('KNG8') as PieceType; // left black knight

    // Act
    const moves1 = calculateMovesforKnights(Knight1, initialPieces);
    const moves2 = calculateMovesforKnights(Knight2, initialPieces);
    const moves3 = calculateMovesforKnights(knight3, initialPieces);
    const moves4 = calculateMovesforKnights(knight4, initialPieces);

    // Assert
    expect(moves1.length).toBe(2);
    expect(moves1).toContainEqual({ x: 5, y: 2 });
    expect(moves1).toContainEqual({ x: 7, y: 2 });

    expect(moves2.length).toBe(2);
    expect(moves2).toContainEqual({ x: 0, y: 2 });
    expect(moves2).toContainEqual({ x: 2, y: 2 });

    expect(moves3.length).toBe(2);
    expect(moves3).toContainEqual({ x: 0, y: 5 });
    expect(moves3).toContainEqual({ x: 2, y: 5 });

    expect(moves4.length).toBe(2);
    expect(moves4).toContainEqual({ x: 5, y: 5 });
    expect(moves4).toContainEqual({ x: 7, y: 5 });
  });
});