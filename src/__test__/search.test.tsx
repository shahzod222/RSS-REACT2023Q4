import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from '../components/search';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../appContext', () => ({
  useAppContext: () => ({
    search: 'Saved Value',
    setSearch: jest.fn(),
    handleSearch: jest.fn(),
  }),
}));

describe('Search component', () => {
  it('saves the entered value to local storage when clicking the Search button', () => {
    render(<Search />);
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'Test Search' } });

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    const savedValue = localStorage.getItem('search');
    expect(savedValue).toBe('Test Search');
  });

  it('retrieves the value from local storage upon mounting', () => {
    localStorage.setItem('search', 'Saved Value');
    render(<Search />);
    const searchInput = screen.getByPlaceholderText('Search...'); // Replace with your actual placeholder text
    expect(searchInput).toHaveValue('Saved Value');
  });
});
