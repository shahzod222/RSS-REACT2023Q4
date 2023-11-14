import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from '../components/card';
import '@testing-library/jest-dom/extend-expect';

const cardData = {
  id: '1',
  urls: {
    regular: 'image-url-1',
  },
  alt_description: 'Alt Description 1',
};

test('renders relevant card data', () => {
  render(<Card el={cardData} />);

  const image = screen.getByAltText(cardData.alt_description);
  expect(image).toBeInTheDocument();

  const title = screen.getByText(cardData.alt_description);
  expect(title).toBeInTheDocument();
});

test('clicking on a card opens a detailed card component and triggers API call', () => {
  const mockGetPicture = jest.fn();
  const cardData = {
    id: '1',
    urls: {
      regular: 'image-url-1',
    },
    alt_description: 'Alt Description 1',
  };

  const { container } = render(<Card el={cardData} handleClick={mockGetPicture} />);

  const card = container.querySelector('.card');
  expect(card).toBeInTheDocument();

  if (card) fireEvent.click(card);

  expect(mockGetPicture).toHaveBeenCalled();
});
