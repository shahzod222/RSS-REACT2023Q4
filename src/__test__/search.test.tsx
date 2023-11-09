import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Search } from '../components/search';

const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('Search component tests', () => {
  it('should save entered value to local storage when clicking the Search button', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Search search="" onSearchChange={() => {}} onSearchClick={() => {}} />
    );

    const searchInput = getByPlaceholderText('Search...');
    const searchButton = getByText('Search');

    fireEvent.change(searchInput, { target: { value: 'cats' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('search', 'cats');
    });
  });

  it('should retrieve the value from local storage upon mounting', async () => {
    mockLocalStorage.getItem.mockReturnValueOnce('dogs');

    const { getByPlaceholderText } = render(
      <Search search="" onSearchChange={() => {}} onSearchClick={() => {}} />
    );

    const searchInput = getByPlaceholderText('Search...');

    await waitFor(() => {
      expect((searchInput as HTMLInputElement).value).toBe('dogs');
    });
  });
});
