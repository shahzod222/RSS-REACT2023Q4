import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { App } from './app';

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/page/1" />} />
        <Route path="/page/:pageNumber" element={<App />} />
      </Routes>
    </Router>
  );
}
