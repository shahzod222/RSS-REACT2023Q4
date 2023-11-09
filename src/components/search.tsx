import React from 'react';
import { SearchProps } from '../types';
import { ErrorButton } from './errorbutton';

export function Search(props: SearchProps) {
  let search = '';

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value;
    props.onSearchChange(newSearch);
    search = event.target.value;
  };

  const handleClick = () => {
    localStorage.setItem('search', search);
    props.onSearchClick();
  };

  return (
    <header>
      <nav className="my-4 navbar">
        <div className="container-fluid">
          <div className="d-flex w-100 justify-content-center" role="search">
            <input
              className="form-control w-75"
              type="search"
              placeholder="Search..."
              aria-label="Search"
              onChange={handleInputChange}
              value={props.search || String(localStorage.getItem('search'))}
            />
            <button className="btn btn-outline-dark mx-3" onClick={handleClick}>
              Search
            </button>
            <ErrorButton />
          </div>
        </div>
      </nav>
    </header>
  );
}
