import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="text-center">
        <h1 className="display-4">404 - Not Found</h1>
        <p className="lead">
          Sorry, the page you are looking for does not exist. <Link to="/page/1">Go back</Link>
        </p>
      </div>
    </div>
  );
}
