import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Card } from '../components/card';
import '@testing-library/jest-dom/extend-expect';

const mockData = {
  id: 'AdkJ-LgpTrE',
  alt_description: 'a man standing in the middle of a canyon',
  urls: {
    regular:
      'https://images.unsplash.com/photo-1683009427619-a1a11b799e05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjUwMzF8MXwxfHNlYXJjaHwxfHxuYXR1cmV8ZW58MHx8fHwxNjk5MzM3MTMzfDA&ixlib=rb-4.0.3&q=80&w=1080',
  },
};

const mockHandleClick = jest.fn();

test('renders the relevant card data', () => {
  const { getByText, getByAltText } = render(<Card el={mockData} handleClick={mockHandleClick} />);

  const cardTitle = getByText('a man standing in the middle of a canyon');
  const cardImage = getByAltText('a man standing in the middle of a canyon');

  expect(cardTitle).toBeInTheDocument();
  expect(cardImage).toBeInTheDocument();
});

test('opens a detailed card component on click', () => {
  const { getByTestId } = render(<Card el={mockData} handleClick={mockHandleClick} />);

  const card = getByTestId('card');
  fireEvent.click(card);

  expect(mockHandleClick).toHaveBeenCalledWith(expect.any(Object));
});
