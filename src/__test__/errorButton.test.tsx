import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from '../appContext';
import '@testing-library/jest-dom/extend-expect';
import { ErrorButton } from '../components/errorbutton';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';

describe('ErrorButton component', () => {
  it('throws an error when the button is clicked', () => {
    render(
      <Router>
        <Provider store={store}>
          <AppProvider>
            <ErrorButton />
          </AppProvider>
        </Provider>
      </Router>
    );

    const errorButton = screen.getByText('Throw an error');
    expect(() => fireEvent.click(errorButton)).toThrow('This is a test error');
  });
});
