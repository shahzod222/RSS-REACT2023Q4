import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Pagination } from '../components/pagination';
import { MemoryRouter } from 'react-router-dom';

afterEach(() => cleanup());

describe('Pagination component tests', () => {
  it('should update URL query parameter when page changes', () => {
    const setPageMock = jest.fn();

    const { getByText } = render(
      <MemoryRouter>
        <Pagination page={1} setPage={setPageMock} />
      </MemoryRouter>
    );
    const nextPageButton = getByText('Next');

    fireEvent.click(nextPageButton);

    expect(setPageMock).toHaveBeenCalledWith(2);
  });

  it('should handle clicking on page numbers correctly', () => {
    const setPageMock = jest.fn();

    const { getByText } = render(
      <MemoryRouter>
        <Pagination page={2} setPage={setPageMock} />
      </MemoryRouter>
    );
    const secondPageButton = getByText('2');

    fireEvent.click(secondPageButton);

    expect(setPageMock).toHaveBeenCalledWith(2);
  });

  it('should handle clicking on "Previous" button correctly', () => {
    const setPageMock = jest.fn();

    const { getByText } = render(
      <MemoryRouter>
        <Pagination page={2} setPage={setPageMock} />
      </MemoryRouter>
    );
    const previousPageButton = getByText('Previous');

    fireEvent.click(previousPageButton);

    expect(setPageMock).toHaveBeenCalledWith(1);
  });

  it('should disable "Previous" button when on the first page', () => {
    const setPageMock = jest.fn();

    const { getByText } = render(
      <MemoryRouter>
        <Pagination page={1} setPage={setPageMock} />
      </MemoryRouter>
    );
    const previousPageButton = getByText('Previous');

    expect(previousPageButton).toBeDisabled();
    fireEvent.click(previousPageButton);

    expect(setPageMock).not.toHaveBeenCalled();
  });
});
