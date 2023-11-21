import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectPage,
  selectPictureId,
  setPage,
  selectMainPageLoading,
  selectItemsPerPage,
  selectSearch,
  setMainPageLoading,
  setData,
  setDetailsPageLoading,
  setDetails,
} from './store';
import { ErrorBoundary } from './errorboundary';
import { Details } from './components/details';
import { Pagination } from './components/pagination';
import { ItemsPerPage } from './components/itemPerPage';
import { Cards } from './components/cards';
import { Search } from './components/search';
import { api } from './api';

export function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pageNumber } = useParams();
  const page = useSelector(selectPage);
  const itemsPerPage = useSelector(selectItemsPerPage);
  const search = useSelector(selectSearch);
  const pictureId = useSelector(selectPictureId);
  const isLoading = useSelector(selectMainPageLoading);

  const { data } = api.useGetDataQuery({
    pageNumber: page,
    itemsPerPage: itemsPerPage,
    search: search || 'nature',
  });

  useEffect(() => {
    dispatch(setMainPageLoading(true));
    if (data) {
      dispatch(setData(data.results));
      dispatch(setMainPageLoading(false));
    }
  }, [search, itemsPerPage, data]);

  useEffect(() => {
    if (pageNumber) {
      dispatch(setPage(pageNumber));
      dispatch(setPage(Number(pageNumber)));
    }
  }, [pageNumber, dispatch]);

  const { data: dataDetails } = api.useGetPictureQuery({ id: pictureId });

  useEffect(() => {
    dispatch(setDetailsPageLoading(true));
    if (dataDetails && pictureId) {
      navigate(`/page/${page}/details/${pictureId}`);
      dispatch(setDetails(dataDetails));
      dispatch(setDetailsPageLoading(false));
    }
  }, [pictureId, dataDetails]);

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
