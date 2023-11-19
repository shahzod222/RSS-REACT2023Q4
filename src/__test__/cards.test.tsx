import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store, setData } from '../store';
import { Cards } from '../components/cards';
import '@testing-library/jest-dom/extend-expect';

describe('Cards component', () => {
  it('renders the specified number of cards', () => {
    const testData = [
      {
        id: '1',
        urls: {
          regular: 'image-url-1',
        },
        alt_description: 'Alt Description 1',
      },
      {
        id: '2',
        urls: {
          regular: 'image-url-2',
        },
        alt_description: 'Alt Description 2',
      },
      // Add more test data as needed
    ];

    store.dispatch(setData(testData));

    render(
      <Provider store={store}>
        <Cards />
      </Provider>
    );

    // Check if the cards are rendered
    const cardElements = screen.getAllByTestId('card');
    expect(cardElements.length).toBe(testData.length);
  });

  it('displays "No data" message when no cards are present', () => {
    // Set the data in the store to an empty array
    store.dispatch(setData([]));

    render(
      <Provider store={store}>
        <Cards />
      </Provider>
    );

    // Check if the "No data" message is displayed
    const noDataMessage = screen.getByText('No data');
    expect(noDataMessage).toBeInTheDocument();
  });
});
