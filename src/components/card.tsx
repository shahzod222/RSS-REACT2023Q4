import React from 'react';
import { CardProps } from '../types';

export function Card(props: CardProps) {
  return (
    <div className="card m-auto" data-testid="card" onClick={props.handleClick} id={props.el.id}>
      <img src={props.el.urls.regular} className="card-img-top" alt={props.el.alt_description} />
      <div className="card-body">
        <h5 className="card-title">{props.el.alt_description}</h5>
      </div>
    </div>
  );
}
