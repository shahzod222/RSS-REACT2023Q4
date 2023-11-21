import { render } from 'preact';
import { AppRoutes } from './routes';
import { Provider } from 'react-redux';
import { store } from './store';
render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>,
  document.getElementById('app')!
);
