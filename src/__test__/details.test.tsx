import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppProvider, useAppContext } from '../appContext';
import { Details } from '../components/details';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

test('displays a loading indicator while fetching data', () => {
  act(() => {
    const MockDetailsComponent = () => {
      const { setDetails } = useAppContext();
      setDetails(null);
      return <Details />;
    };

    render(
      <MemoryRouter>
        <AppProvider>
          <MockDetailsComponent />
        </AppProvider>
      </MemoryRouter>
    );
  });

  const loadingIndicator = screen.getByText('Loading...');
  expect(loadingIndicator).toBeInTheDocument();
});

test('displays detailed card data', () => {
  const detailsData = {
    id: '1',
    urls: {
      regular: 'image-url-1',
    },
    alt_description: 'Alt Description 1',
  };

  act(() => {
    const MockDetailsComponent = () => {
      const { setDetails } = useAppContext();
      setDetails(detailsData);
      return <Details />;
    };

    render(
      <MemoryRouter>
        <AppProvider>
          <MockDetailsComponent />
        </AppProvider>
      </MemoryRouter>
    );
  });

  const cardTitle = screen.getByText(detailsData.alt_description);
  expect(cardTitle).toBeInTheDocument();
});
