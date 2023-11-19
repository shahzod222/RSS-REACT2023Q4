import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from '../appContext';
import { Pagination } from '../components/pagination';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store';
import '@testing-library/jest-dom/extend-expect';

describe('Pagination component', () => {
  it('updates URL query parameter when page changes', () => {
    render(
      <Router>
        <Provider store={store}>
          <Pagination />
        </Provider>
      </Router>
    );

    const nextPageButton = screen.getByTestId('next-btn');
    fireEvent.click(nextPageButton);

    expect(window.location.pathname).toBe('/page/2');

    const prevPageButton = screen.getByTestId('prev-btn');
    fireEvent.click(prevPageButton);

    expect(window.location.pathname).toBe('/page/1');
  });

  it('disables Prev button when 1 page', () => {
    render(
      <Router>
        <Provider store={store}>
          <AppProvider>
            <Pagination />
          </AppProvider>
        </Provider>
      </Router>
    );

    const prevPageButton = screen.getByTestId('prev-btn');

    expect(prevPageButton).toBeDisabled();
  });
});
