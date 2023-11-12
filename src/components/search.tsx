import React from 'react';
import { ErrorButton } from './errorbutton';
import { useAppContext } from '../appContext';

export function Search() {
  let searchForLS = '';
  const { search, setSearch, handleSearch } = useAppContext();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value;
    searchForLS = newSearch;
    setSearch(newSearch);
  };

  const handleClick = () => {
    localStorage.setItem('search', searchForLS);
    handleSearch();
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
