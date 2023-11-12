import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from '../appContext';
import { Pagination } from '../components/pagination';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

describe('Pagination component', () => {
  it('updates URL query parameter when page changes', () => {
    render(
      <Router>
        <AppProvider>
          <Pagination />
        </AppProvider>
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
        <AppProvider>
          <Pagination />
        </AppProvider>
      </Router>
    );

    const prevPageButton = screen.getByTestId('prev-btn');

    expect(prevPageButton).toBeDisabled();
  });
});
