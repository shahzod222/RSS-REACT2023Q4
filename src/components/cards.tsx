import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPictureId, selectData, selectPage } from '../store';
import { Card } from './card';
import router from 'next/router';

export const Cards = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  const page = useSelector(selectPage);

  const handleClick = (id: string) => {
    dispatch(setPictureId(id));
    router.push(`/page/${page}/details/${id}`);
  };

  return (
    <div className="row row-cols-1 row-cols-md-3 g-3 my-4" data-testid="cards">
      {data.length !== 0 ? (
        data.map((el) => <Card key={el.id} el={el} handleClick={() => handleClick(el.id)} />)
      ) : (
        <h2>No data</h2>
      )}
    </div>
  );
};
