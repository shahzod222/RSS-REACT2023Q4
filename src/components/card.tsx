import React from 'react';
import { CardProps } from '../types';

export function Card(props: CardProps) {
  return (
    <div className="card m-auto" onClick={props.handleClick} id={props.el.id}>
      <img src={props.el.urls.regular} className="card-img-top" alt={props.el.id} />
      <div className="card-body">
        <h5 className="card-title">{props.el.slug}</h5>
      </div>
    </div>
  );
}
