import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from '../components/search';
import { Provider } from 'react-redux';
import { store } from '../store';
import '@testing-library/jest-dom/extend-expect';
import { AppProvider } from '../appContext';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Search component', () => {
  it('retrieves the value from local storage upon mounting', () => {
    const searchValue = 'test-search';
    localStorage.setItem('search', searchValue);

    render(
      <Router>
        <Provider store={store}>
          <AppProvider>
            <Search />
          </AppProvider>
        </Provider>
      </Router>
    );

    const searchInput = screen.getByPlaceholderText('Search...') as HTMLInputElement;

    expect(searchInput.value).toBe(searchValue);
  });

  it('updates the Redux store when the user types something', () => {
    render(
      <Router>
        <Provider store={store}>
          <AppProvider>
            <Search />
          </AppProvider>
        </Provider>
      </Router>
    );

    const searchInput = screen.getByPlaceholderText('Search...');
    const newValue = 'new-search-value';

    fireEvent.change(searchInput, { target: { value: newValue } });

    const updatedSearchValue = store.getState().app.search;
    expect(updatedSearchValue).toBe(newValue);
  });
});
