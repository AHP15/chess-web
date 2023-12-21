import React from 'react';
import { expect, test } from 'vitest'
import App from '../../../src/App';
import { render, fireEvent, screen } from '@testing-library/react';


test('test App', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button'));

  screen.getByRole('button');

  expect(screen.getByRole('button').textContent).toBe('count is 1');
});
