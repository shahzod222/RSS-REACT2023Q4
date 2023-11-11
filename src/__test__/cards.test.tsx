import React from 'react';
import { render, screen } from '@testing-library/react';
import { Cards } from '../components/cards';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../appContext', () => {
  return {
    useAppContext: () => ({
      data: [],
    }),
  };
});

test('renders the specified number of cards', () => {
  render(<Cards />);

  const cards = screen.queryAllByTestId('card');
  expect(cards).toHaveLength(0);
});

test('displays an appropriate message if no cards are present', () => {
  render(<Cards />);

  const noDataMessage = screen.getByText('No data');
  expect(noDataMessage).toBeInTheDocument();
});
