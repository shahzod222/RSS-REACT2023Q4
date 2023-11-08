import React from 'react';
import { CardsProps } from '../types';
import { Card } from './card';

export function Cards(props: CardsProps) {
  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const parentDiv = (e.target as HTMLElement).closest('.card');

    if (parentDiv) {
      const picId = parentDiv.id;
      props.setPictureId(picId);
    }
  }

  return (
    <div className="row row-cols-1 row-cols-md-3 g-3 my-4">
      {props.data.length !== 0 ? (
        props.data.map((el) => <Card el={el} handleClick={handleClick} key={el.id} />)
      ) : (
        <h2>No data</h2>
      )}
    </div>
  );
}
