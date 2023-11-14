import React from 'react';
import { Card } from './card';
import { useAppContext } from '../appContext';

export const Cards = () => {
  const { setPictureId, data } = useAppContext();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const parentDiv = (e.target as HTMLElement).closest('.card');

    if (parentDiv) {
      const picId = parentDiv.id;
      setPictureId(picId);
    }
  };

  return (
    <div className="row row-cols-1 row-cols-md-3 g-3 my-4">
      {data.length !== 0 ? (
        data.map((el) => <Card el={el} handleClick={handleClick} key={el.id} />)
      ) : (
        <h2>No data</h2>
      )}
    </div>
  );
};
