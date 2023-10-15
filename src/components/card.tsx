import React from 'react';
import { CardsProps } from '../types';

export default class Cards extends React.Component<CardsProps> {
  constructor(props: CardsProps) {
    super(props);
  }

  render() {
    return (
      <div className="d-flex flex-wrap justify-content-center align-items-center bg-transparent">
        {this.props.data.length !== 0 ? (
          this.props.data.map(
            (el) =>
              el.poster_path &&
              el.overview && (
                <div
                  className="card mb-3  border-light mx-auto"
                  style={{ maxWidth: '540px' }}
                  key={el.id}
                >
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={`https://image.tmdb.org/t/p/w185${el?.poster_path}`}
                        className="img-fluid rounded-start"
                        alt={el.title}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{el.title}</h5>
                        <p className="card-text">
                          {el.overview.length > 250
                            ? el.overview.slice(0, 250) + '...'
                            : el.overview}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
          )
        ) : (
          <h2 className="text-light">Loading...</h2>
        )}
      </div>
    );
  }
}
