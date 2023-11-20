import { render, screen } from '@testing-library/react';
import { AppRoutes } from '../routes';
import { Provider } from 'react-redux';
import { store } from '../store';
import '@testing-library/jest-dom/extend-expect';

test('renders AppRoutes without errors', () => {
  render(
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );

  // You can add more specific assertions based on your routes and components
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  // Add more assertions as needed
});
