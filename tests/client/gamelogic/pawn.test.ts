import { describe, expect, test } from 'vitest';
import initialPieces, { PieceType } from '../../../gameLogic/initialPieces';
import calculatePossibleMovesforPawns from '../../../gameLogic/pawnCalculation';

describe('pawn tests', () => {
  test('it calculate for pawns', () => {
    // Arrange
    const pawn = initialPieces.get('PA2') as PieceType; // white pawn
    const pawn2 = initialPieces.get('PA7') as PieceType; // black pawn

    // Act
    const moves = calculatePossibleMovesforPawns(pawn, initialPieces);
    const moves2 = calculatePossibleMovesforPawns(pawn2, initialPieces);

    // Assert
    expect(moves.length).toBe(2);
    expect(moves).toContainEqual({ x: 0, y: 2 });
    expect(moves).toContainEqual({ x: 0, y: 3 });

    expect(moves2.length).toBe(2);
    expect(moves2).toContainEqual({ x: 0, y: 5 });
    expect(moves2).toContainEqual({ x: 0, y: 4 });
  });

  test('Moving pawn two squares available only for the first move', () => {
    // Arrange
    const peices = new Map<string, PieceType>([...initialPieces]);
    peices.set('PA2', { ...initialPieces.get('PA2') as PieceType, isFirstMove: false });
    peices.set('PA7', { ...initialPieces.get('PA7') as PieceType, isFirstMove: false });

    // Act
    const moves = calculatePossibleMovesforPawns(peices.get('PA2') as PieceType, peices);
    const moves2 = calculatePossibleMovesforPawns(peices.get('PA7') as PieceType, peices);

    // Assert
    expect(moves.length).toBe(1);
    expect(moves).toContainEqual({ x: 0, y: 2 });

    expect(moves2.length).toBe(1);
    expect(moves2).toContainEqual({ x: 0, y: 5 });
  });
});