import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch, selectSearch } from '../store';
import { ErrorButton } from './errorbutton';

export function Search() {
  let searchForLS = '';
  const dispatch = useDispatch();
  const search: string = useSelector(selectSearch);

  useEffect(() => {
    dispatch(setSearch(localStorage.getItem('search') || ''));
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchForLS = event.target.value;
    dispatch(setSearch(event.target.value));
    localStorage.setItem('search', event.target.value);
  };

  const handleClick = () => {
    localStorage.setItem('search', searchForLS);
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
              value={search || String(localStorage.getItem('search'))}
              data-testid="search-input"
            />
            <button
              className="btn btn-outline-dark mx-3"
              onClick={handleClick}
              data-testid="search-button"
            >
              Search
            </button>
            <ErrorButton />
          </div>
        </div>
      </nav>
    </header>
  );
}
