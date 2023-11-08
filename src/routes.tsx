import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { App } from './app';
import { NotFound } from './components/notfound';

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/page/1" />} />
        <Route path="/page/:pageNumber" element={<App />} />
        <Route path="/page/:pageNumber/details/:pictureId" element={<App />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
  );
}
