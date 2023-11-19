import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch as setReduxSearch, selectSearch } from '../store';
import { ErrorButton } from './errorbutton';
import { useAppContext } from '../appContext';

export function Search() {
  const dispatch = useDispatch();
  const search: string = useSelector(selectSearch);
  const { handleSearch } = useAppContext();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setReduxSearch(event.target.value));
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
              value={search}
              data-testid="search-input"
            />
            <button
              className="btn btn-outline-dark mx-3"
              onClick={handleSearch}
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
