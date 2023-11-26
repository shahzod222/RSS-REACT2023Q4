import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { ErrorButton } from '../components/errorbutton';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import React from 'react';

describe('ErrorButton component', () => {
  it('throws an error when the button is clicked', () => {
    render(
      <Router>
        <Provider store={store}>
          <ErrorButton />
        </Provider>
      </Router>
    );

    const errorButton = screen.getByText('Throw an error');
    expect(() => fireEvent.click(errorButton)).toThrow('This is a test error');
  });
});
