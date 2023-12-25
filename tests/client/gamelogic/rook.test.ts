import { describe, expect, test } from 'vitest';
import initialPieces, { PieceType } from '../../../gameLogic/initialPieces';
import calculatePossibleMovesforRooks from '../../../gameLogic/rookCalculation';

describe('rook tests', () => {
  test('it should detect no possabile squares', () => {
    // Arrange
    const rook1 = initialPieces.get('RA1') as PieceType; // left white rook
    const rook2 = initialPieces.get('RH1') as PieceType; // right white rook
    const rook3 = initialPieces.get('RA8') as PieceType; // left black rook
    const rook4 = initialPieces.get('RH8') as PieceType; // right black rook


    // Act
    const moves1 = calculatePossibleMovesforRooks(rook1, initialPieces);
    const moves2 = calculatePossibleMovesforRooks(rook2, initialPieces);
    const moves3 = calculatePossibleMovesforRooks(rook3, initialPieces);
    const moves4 = calculatePossibleMovesforRooks(rook4, initialPieces);

    // Assert
    expect(moves1.length).toBe(0);
    expect(moves2.length).toBe(0);
    expect(moves3.length).toBe(0);
    expect(moves4.length).toBe(0);
  });


  test('it should detect possible squares in vertical line to top', () => {
    // Arrange
    const rook = initialPieces.get('RA1') as PieceType; // left white rook
    // pieces without PA2
    const peices = new Map<string, PieceType>([...initialPieces]);
    peices.delete('PA2');

    // Act
    const moves = calculatePossibleMovesforRooks(rook, peices);

    // Assert
    expect(moves.length).toBe(6);
    expect(moves).toContainEqual({ x: 0, y: 1 });
    expect(moves).toContainEqual({ x: 0, y: 2 });
    expect(moves).toContainEqual({ x: 0, y: 3 });
    expect(moves).toContainEqual({ x: 0, y: 4 });
    expect(moves).toContainEqual({ x: 0, y: 5 });
    expect(moves).toContainEqual({ x: 0, y: 6 });
  });

  test('it should detect possible squares in vertical line to bottom', () => {
    // Arrange
    const rook = initialPieces.get('RA8') as PieceType; // right black rook
    // pieces without PA7
    const peices = new Map<string, PieceType>([...initialPieces]);
    peices.delete('PA7');

    // Act
    const moves = calculatePossibleMovesforRooks(rook, peices);

    // Assert
    expect(moves.length).toBe(6);
    expect(moves).toContainEqual({ x: 0, y: 6 });
    expect(moves).toContainEqual({ x: 0, y: 5 });
    expect(moves).toContainEqual({ x: 0, y: 4 });
    expect(moves).toContainEqual({ x: 0, y: 3 });
    expect(moves).toContainEqual({ x: 0, y: 2 });
    expect(moves).toContainEqual({ x: 0, y: 1 });
  });

  test('it should detect possible squares in horizontal line to left', () => {
    // Arrange
    const rook = initialPieces.get('RH1') as PieceType; // right white rook

    const peices = new Map<string, PieceType>([...initialPieces]);
    peices.delete('KNG1'); // right white knight
    peices.delete('BF1'); // right white bishop

    // Act
    const moves = calculatePossibleMovesforRooks(rook, peices);

    // Assert
    expect(moves.length).toBe(2);
    expect(moves).toContainEqual({ x: 6, y: 0 });
    expect(moves).toContainEqual({ x: 5, y: 0 });
  });

  test('it should detect possible squares in horizontal line to right', () => {
    // Arrange
    const rook = initialPieces.get('RA8') as PieceType; // right black rook

    const peices = new Map<string, PieceType>([...initialPieces]);
    peices.delete('KNB8'); // right black knight
    peices.delete('BC8'); // right black bishop

    // Act
    const moves = calculatePossibleMovesforRooks(rook, peices);

    // Assert
    expect(moves.length).toBe(2);
    expect(moves).toContainEqual({ x: 1, y: 7 });
    expect(moves).toContainEqual({ x: 2, y: 7 });
  });
});
