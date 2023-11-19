import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectPage,
  selectPictureId,
  selectItemsPerPage,
  setPage,
  setSearch,
  selectMainPageLoading,
} from './store';
import { ErrorBoundary } from './errorboundary';
import { Details } from './components/details';
import { Pagination } from './components/pagination';
import { ItemsPerPage } from './components/itemPerPage';
import { Cards } from './components/cards';
import { Search } from './components/search';
import { useAppContext } from './appContext';

export function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pageNumber } = useParams();
  const page = useSelector(selectPage);
  const pictureId = useSelector(selectPictureId);
  const itemsPerPage = useSelector(selectItemsPerPage);
  const { getData, getPicture } = useAppContext();
  const isLoading = useSelector(selectMainPageLoading);

  useEffect(() => {
    if (pageNumber) dispatch(setPage(Number(pageNumber)));
  }, [pageNumber, dispatch]);

  useEffect(() => {
    if (pictureId) {
      navigate(`/page/${page}/details/${pictureId}`);
      getPicture(pictureId);
    }
  }, [pictureId]);

  useEffect(() => {
    getData();
  }, [itemsPerPage]);

  useEffect(() => {
    getData();
    navigate(`/page/${page}`);
  }, [page]);

  useEffect(() => {
    dispatch(setSearch(localStorage.getItem('search') || ''));
    getData();
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <div className="bg-light position-relative z-0">
        <Search />
        <ItemsPerPage />
        <Pagination />
        {!isLoading ? <Cards /> : <h2>Loading...</h2>}
        <Pagination />
      </div>
      {pictureId && <Details />}
    </ErrorBoundary>
  );
}
