import React from 'react';
import { render, screen } from '@testing-library/react';
import { Search } from '../components/search';
import { Provider } from 'react-redux';
import { store } from '../store';
import '@testing-library/jest-dom/extend-expect';
import { AppProvider } from '../appContext';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Search component', () => {
  it('retrieves the value from local storage upon mounting', () => {
    localStorage.setItem('search', 'ocean');

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
    expect(searchInput).toHaveValue('ocean');
  });
});
