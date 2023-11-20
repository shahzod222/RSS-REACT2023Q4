import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDetails, setPictureId, selectDetailsPageLoading } from '../store';
import { Card } from './card';

export function Details() {
  const dispatch = useDispatch();
  const details = useSelector(selectDetails);
  const isLoading = useSelector(selectDetailsPageLoading);
  console.log(isLoading);

  const handleClose = () => {
    dispatch(setPictureId(null));
  };

  const handleInnerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      data-testid="details"
      className="w-100 z-3 position-fixed d-flex align-items-center justify-content-end"
      style={{
        top: 0,
        backdropFilter: 'blur(5px)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: '100vh',
      }}
      onClick={handleClose}
    >
      <div
        className="w-50 h-100 py-4 p-4 d-flex flex-column justify-content-center align-items-center"
        style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        }}
        onClick={handleInnerClick}
        data-testid="inner-content"
      >
        {details !== null && !isLoading ? (
          <>
            <button onClick={handleClose} className="btn btn-outline-dark w-75">
              Close
            </button>
            <Card el={details} />
          </>
        ) : (
          <h2 className="text-dark">Loading...</h2>
        )}
      </div>
    </div>
  );
}
