import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AppProvider, useAppContext } from '../appContext';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { selectSearch, setSearch, store } from '../store';

describe('Search component', () => {
  it('updates search value and triggers search when "Search" button is clicked', async () => {
    const TestComponent = () => {
      const context = useAppContext();
      const dispatch = useDispatch();
      const search = useSelector(selectSearch);
      return (
        <div>
          <input
            data-testid="search-input"
            type="text"
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
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
        <Provider store={store}>
          <AppProvider>
            <TestComponent />
          </AppProvider>
        </Provider>
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
