import React from 'react';
import { CardsProps } from '../types';

export function Cards(props: CardsProps) {
  return (
    <div className="d-flex flex-wrap justify-content-between mx-5">
      {props.data.length !== 0 ? (
        props.data.map(
          (el) =>
            el.poster_path &&
            el.overview && (
              <div className="card my-3" style={{ width: '300px' }} key={el.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${el?.poster_path}`}
                  className="card-img-top"
                  alt={el.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{el.title}</h5>
                  <p className="card-text">
                    {el.overview.length > 250 ? el.overview.slice(0, 250) + '...' : el.overview}
                  </p>
                </div>
              </div>
            )
        )
      ) : (
        <h2 className="text-dark">Loading...</h2>
      )}
    </div>
  );
}
