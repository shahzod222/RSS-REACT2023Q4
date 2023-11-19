import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { App } from './app';
import { NotFound } from './components/notfound';
import { AppProvider } from './appContext';

export function AppRoutes() {
  return (
    <Router>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/page/1" />} />
          <Route path="/page/:pageNumber" element={<App />}>
            <Route path="details/:pictureId" element={<App />} />
          </Route>
          <Route path="/404" element={<NotFound />} />
          <Route path="/*" element={<Navigate to="/404" />} />
        </Routes>
      </AppProvider>
    </Router>
  );
}
export { Routes };
