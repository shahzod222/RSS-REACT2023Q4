import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { NotFound } from '../components/notfound';

test('renders 404 page for an invalid route', () => {
  const history = createMemoryHistory();
  history.push('/non-existing-route');

  render(
    <MemoryRouter initialEntries={['/non-existing-route']} initialIndex={0}>
      <NotFound />
    </MemoryRouter>
  );

  expect(screen.getByText(/404 - Not Found/i)).toBeInTheDocument();
  expect(
    screen.getByText(/Sorry, the page you are looking for does not exist./i)
  ).toBeInTheDocument();
});
