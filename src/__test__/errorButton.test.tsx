import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from '../appContext';
import '@testing-library/jest-dom/extend-expect';
import { ErrorButton } from '../components/errorbutton';
import { fireEvent, render, screen } from '@testing-library/react';

describe('ErrorButton component', () => {
  it('throws an error when the button is clicked', () => {
    render(
      <Router>
        <AppProvider>
          <ErrorButton />
        </AppProvider>
      </Router>
    );

    const errorButton = screen.getByText('Throw an error');
    expect(() => fireEvent.click(errorButton)).toThrow('This is a test error');
  });
});
