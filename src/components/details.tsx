import React from 'react';
import { Card } from './card';
import { DetailsProps } from '../types';
import { Outlet } from 'react-router-dom';

export function Details(props: DetailsProps) {
  const handleInnerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="w-100 z-3 position-fixed d-flex align-items-center justify-content-end"
      style={{
        top: 0,
        backdropFilter: 'blur(5px)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: '100vh',
      }}
      onClick={props.handleClose}
    >
      <div
        className="w-50 h-100 py-4 p-4 d-flex flex-column justify-content-center align-items-center"
        style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        }}
        onClick={handleInnerClick}
      >
        {props.data !== null ? (
          <>
            <button onClick={props.handleClose} className="btn btn-outline-dark w-75">
              Close
            </button>
            <Card el={props.data} />
          </>
        ) : (
          <h2 className="text-dark">Loading...</h2>
        )}
        <Outlet />
      </div>
    </div>
  );
}
