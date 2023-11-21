import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setData, store } from '../store';
import { Cards } from '../components/cards';
import '@testing-library/jest-dom/extend-expect';
import { Card } from '../components/card';

describe('Card component', () => {
  it('renders card data', () => {
    const testData = [
      {
        id: '1',
        urls: {
          regular: 'image-url-1',
        },
        alt_description: 'Alt Description 1',
      },
    ];

    store.dispatch(setData(testData));

    render(
      <Provider store={store}>
        <Cards />
      </Provider>
    );

    const cardTitle = screen.getByText(testData[0].alt_description);
    expect(cardTitle).toBeInTheDocument();
  });

  it('clicking on a card opens a detailed card component and triggers API call', () => {
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
});
