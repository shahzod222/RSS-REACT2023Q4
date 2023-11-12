import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AppProvider, useAppContext } from '../appContext';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Search component', () => {
  it('updates search value and triggers search when "Search" button is clicked', async () => {
    const TestComponent = () => {
      const context = useAppContext();
      return (
        <div>
          <input
            data-testid="search-input"
            type="text"
            value={context.search}
            onChange={(e) => context.setSearch(e.target.value)}
          />
          <button data-testid="search-button" onClick={context.handleSearch}>
            Search
          </button>
        </div>
      );
    };

    // Mock the fetch function to prevent actual network requests
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ results: [] }),
    });

    render(
      <Router>
        <AppProvider>
          <TestComponent />
        </AppProvider>
      </Router>
    );

    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');

    fireEvent.change(searchInput, { target: { value: 'newSearch' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });
});
