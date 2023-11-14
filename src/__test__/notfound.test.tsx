import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { NotFound } from '../components/notfound';
import '@testing-library/jest-dom/extend-expect';

describe('404 Page component', () => {
  it('displays the 404 page for an invalid route', () => {
    render(
      <MemoryRouter initialEntries={['/invalid-route']}>
        <Routes>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );

    const headingElement = screen.getByText('404 - Not Found');
    expect(headingElement).toBeInTheDocument();

    const goBackLink = screen.getByRole('link', { name: 'Go back' });
    expect(goBackLink).toBeInTheDocument();
  });
});
