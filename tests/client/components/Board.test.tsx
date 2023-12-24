import React from 'react';
import { expect, test, describe } from 'vitest'
import Board from '../../../src/components/Board';
import { render, fireEvent, screen } from '@testing-library/react';


describe('test Board for white pieces', () => {
  test('when empty squared is clicked, a clear operation should performed', () => {
    // ARRANGE
    render(<Board player='white' />);

    // ACT
    fireEvent.click(screen.getByTitle('A2')); // white pawn
    fireEvent.click(screen.getByTitle('A3')); // empty square

    // ASSERT
    expect(screen.getByTestId('clear')).toBeDefined();
  });

  test('when the user click one of his pieces calculation of possible moves should be performed', () => {
    // ARRANGE
    render(<Board player='white' />);

    // ACT
    fireEvent.click(screen.getByTitle('A1')); // left white rook

    // ASSERT
    expect(screen.getByTestId('calculate')).toBeDefined();
  });
});