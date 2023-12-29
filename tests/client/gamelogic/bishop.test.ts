import { describe, expect, test } from 'vitest';
import initialPieces, { PieceType } from '../../../gameLogic/initialPieces';
import calculatePossibleMovesforBishops from '../../../gameLogic/bishopCalculation';

describe('bishop tests', () => {
  test('it should detect no possabile squares', () => {
    // Arrange
    const bishop1 = initialPieces.get('BF1') as PieceType; // right white bishop
    const bishop2 = initialPieces.get('BC1') as PieceType; // left white bishop
    const bishop3 = initialPieces.get('BF8') as PieceType; // left black bishop
    const bishop4 = initialPieces.get('BC8') as PieceType; // right black bishop

    // Act
    const moves1 = calculatePossibleMovesforBishops(bishop1, initialPieces);
    const moves2 = calculatePossibleMovesforBishops(bishop2, initialPieces);
    const moves3 = calculatePossibleMovesforBishops(bishop3, initialPieces);
    const moves4 = calculatePossibleMovesforBishops(bishop4, initialPieces);

    // Assert
    expect(moves1.length).toBe(0);
    expect(moves2.length).toBe(0);
    expect(moves3.length).toBe(0);
    expect(moves4.length).toBe(0);
  });

  test('it should detect squares in line to right top', () => {
    // Arrange
    const bishop = initialPieces.get('BC1') as PieceType; // left white bishop
    // pieces without PD2
    const peices = new Map<string, PieceType>([...initialPieces]);
    peices.delete('PD2');

    // Act
    const moves = calculatePossibleMovesforBishops(bishop, peices);

    // Assert
    expect(moves.length).toBe(5);
    expect(moves).toContainEqual({ x: 3, y: 1 });
    expect(moves).toContainEqual({ x: 4, y: 2 });
    expect(moves).toContainEqual({ x: 5, y: 3 });
  });

  test('it should detect squares in line to left bottom', () => {
    // Arrange
    const bishop = initialPieces.get('BF8') as PieceType; // left black bishop
    // pieces without PE7
    const peices = new Map<string, PieceType>([...initialPieces]);
    peices.delete('PE7');

    // Act
    const moves = calculatePossibleMovesforBishops(bishop, peices);

    // Assert
    expect(moves.length).toBe(5);
    expect(moves).toContainEqual({ x: 4, y: 6 });
    expect(moves).toContainEqual({ x: 3, y: 5 });
    expect(moves).toContainEqual({ x: 2, y: 4 });
  });

  test('it should detect squares in line to left top', () => {
    // Arrange
    const bishop = initialPieces.get('BF1') as PieceType; // right white bishop
    // pieces without PE2
    const peices = new Map<string, PieceType>([...initialPieces]);
    peices.delete('PE2');

    // Act
    const moves = calculatePossibleMovesforBishops(bishop, peices);

    // Assert
    expect(moves.length).toBe(5);
    expect(moves).toContainEqual({ x: 4, y: 1 });
    expect(moves).toContainEqual({ x: 3, y: 2 });
    expect(moves).toContainEqual({ x: 2, y: 3 });
    expect(moves).toContainEqual({ x: 1, y: 4 });
  });

  test('it should detect squares in line to right bottom', () => {
    // Arrange
    const bishop = initialPieces.get('BC8') as PieceType; // right black bishop
    // pieces without PD7
    const peices = new Map<string, PieceType>([...initialPieces]);
    peices.delete('PD7');

    // Act
    const moves = calculatePossibleMovesforBishops(bishop, peices);

    // Assert
    expect(moves.length).toBe(5);
    expect(moves).toContainEqual({ x: 3, y: 6 });
    expect(moves).toContainEqual({ x: 4, y: 5 });
    expect(moves).toContainEqual({ x: 5, y: 4 });
    expect(moves).toContainEqual({ x: 6, y: 3 });
  });
});