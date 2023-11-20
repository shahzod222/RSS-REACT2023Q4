import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearch,
  selectSearch,
  setData,
  setMainPageLoading,
  selectItemsPerPage,
  selectPage,
} from '../store';
import { ErrorButton } from './errorbutton';
import { api } from '../api';

export function Search() {
  let searchForLS = '';
  const dispatch = useDispatch();
  const search: string = useSelector(selectSearch);
  const itemsPerPage: number = useSelector(selectItemsPerPage);
  const page: number = useSelector(selectPage);

  const { data } = api.useGetDataQuery({
    pageNumber: page,
    itemsPerPage: itemsPerPage,
    search: searchForLS,
  });

  useEffect(() => {
    dispatch(setMainPageLoading(true));
    if (data) {
      dispatch(setData(data.results));
      dispatch(setMainPageLoading(false));
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchForLS = event.target.value;
    dispatch(setSearch(event.target.value));
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
