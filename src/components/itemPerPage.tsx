import React from 'react';
import { useDispatch } from 'react-redux';
import { setItemsPerPage, setPage } from '../store';

export function ItemsPerPage() {
  const dispatch = useDispatch();

  const handleChange = (value: number) => {
    dispatch(setItemsPerPage(value));
    dispatch(setPage(1));
    console.log(value);
  };

  return (
    <div className="container d-flex justify-content-center">
      <h3>Items per page: </h3>
      <button className="btn btn-outline-dark px-4 mx-2" onClick={() => handleChange(10)}>
        10
      </button>
      <button className="btn btn-outline-dark px-4 mx-2" onClick={() => handleChange(15)}>
        15
      </button>
      <button className="btn btn-outline-dark px-4 mx-2" onClick={() => handleChange(20)}>
        20
      </button>
    </div>
  );
}
