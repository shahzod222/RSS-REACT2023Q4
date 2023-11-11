import React from 'react';
import { useAppContext } from '../appContext';

export function ItemsPerPage() {
  const { setItemsPerPage, setPage } = useAppContext();

  const handleChange = (e: React.MouseEvent) => {
    const value = Number((e.target as HTMLButtonElement).textContent);
    setItemsPerPage(value);
    setPage(1);
  };

  return (
    <div className="container d-flex justify-content-center">
      <h3>Items per page: </h3>
      <button className="btn btn-outline-dark px-4 mx-2" onClick={handleChange}>
        10
      </button>
      <button className="btn btn-outline-dark px-4 mx-2" onClick={handleChange}>
        15
      </button>
      <button className="btn btn-outline-dark px-4 mx-2" onClick={handleChange}>
        20
      </button>
    </div>
  );
}
