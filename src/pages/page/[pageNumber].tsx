import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectMainPageLoading,
  selectPage,
  setMainPageLoading,
  setPage,
  selectPictureId,
  selectItemsPerPage,
  selectSearch,
  setData,
} from '../../store';
import { ErrorBoundary } from '../../errorboundary';
import { Details } from '../../components/details';
import { Pagination } from '../../components/pagination';
import { ItemsPerPage } from '../../components/itemPerPage';
import { Cards } from '../../components/cards';
import { Search } from '../../components/search';
import { api } from '../../api';

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { pageNumber } = router.query;
  const page = useSelector(selectPage);
  const itemsPerPage = useSelector(selectItemsPerPage);
  const isLoading = useSelector(selectMainPageLoading);
  const pictureId = useSelector(selectPictureId);
  const search = useSelector(selectSearch);

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
  }, [dispatch, data]);

  useEffect(() => {
    if (pageNumber) {
      dispatch(setPage(Number(pageNumber)));
    }
  }, [pageNumber, dispatch]);

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
};

export default Page;
