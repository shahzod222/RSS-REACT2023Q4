import React from 'react';
import { CardsProps } from '../types';
import { Card } from './card';

export function Cards(props: CardsProps) {
  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const parentDiv = (e.target as HTMLElement).closest('.card');

    if (parentDiv) {
      const movieId = Number(parentDiv.id);
      props.setMovieId(movieId);
    }
  }

  return (
    <div className="d-flex flex-wrap justify-content-center mx-5">
      {props.data.length !== 0 ? (
        props.data.map(
          (el) =>
            el.poster_path && el.overview && <Card el={el} handleClick={handleClick} key={el.id} />
        )
      ) : (
        <h2 className="text-dark">Loading...</h2>
      )}
    </div>
  );
}
