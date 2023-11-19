import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store, setDetails } from '../store';
import { Details } from '../components/details';
import '@testing-library/jest-dom/extend-expect';

describe('Details component', () => {
  it('displays loading indicator while fetching data', () => {
    store.dispatch(setDetails(null));

    render(
      <Provider store={store}>
        <Details />
      </Provider>
    );

    const loadingMessage = screen.getByText('Loading...');
    expect(loadingMessage).toBeInTheDocument();
  });

  it('displays detailed card component with correct data', async () => {
    const testData = {
      id: '1',
      urls: {
        regular: 'image-url-1',
      },
      alt_description: 'Alt Description 1',
    };

    store.dispatch(setDetails(testData));

    render(
      <Provider store={store}>
        <Details />
      </Provider>
    );

    await waitFor(() => {
      const detailedCard = screen.getByTestId('card');
      expect(detailedCard).toBeInTheDocument();

      const cardTitle = screen.getByText(testData.alt_description);
      expect(cardTitle).toBeInTheDocument();
    });
  });

  it('hides the component when clicking the close button', () => {
    const testData = {
      id: '1',
      urls: {
        regular: 'image-url-1',
      },
      alt_description: 'Alt Description 1',
    };

    store.dispatch(setDetails(testData));

    render(
      <Provider store={store}>
        <Details />
      </Provider>
    );

    const detailedCard = screen.getByTestId('card');
    expect(detailedCard).toBeInTheDocument();

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    waitFor(() => {
      const detailedCardAfterClose = screen.queryByTestId('card');
      expect(detailedCardAfterClose).toBeNull();
    });
  });
});
