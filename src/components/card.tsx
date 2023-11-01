import { CardProps } from '../types';

export function Card(props: CardProps) {
  return (
    <div
      className="card my-3 mx-2"
      style={{ width: '300px' }}
      onClick={props.handleClick}
      id={`${props.el.id}`}
    >
      <img
        src={`https://image.tmdb.org/t/p/w300${props.el?.poster_path}`}
        className="card-img-top"
        alt={props.el.title}
      />
      <div className="card-body">
        <h5 className="card-title">{props.el.title}</h5>
        <p className="card-text">
          {props.el.overview.length > 250
            ? props.el.overview.slice(0, 250) + '...'
            : props.el.overview}
        </p>
      </div>
    </div>
  );
}
