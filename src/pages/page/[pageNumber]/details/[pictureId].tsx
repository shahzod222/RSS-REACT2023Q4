import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectMainPageLoading,
  setDetailsPageLoading,
  setDetails,
  selectPictureId,
} from '../../../../store';
import { ErrorBoundary } from '../../../../errorboundary';
import { Details } from '../../../../components/details';
import { Pagination } from '../../../../components/pagination';
import { ItemsPerPage } from '../../../../components/itemPerPage';
import { Cards } from '../../../../components/cards';
import { Search } from '../../../../components/search';
import { api } from '../../../../api';
import { useRouter } from 'next/router';
import React from 'react';

const DetailsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { pictureId } = router.query;
  const mainPageLoading = useSelector(selectMainPageLoading);
  const id = useSelector(selectPictureId);

  const { data } = api.useGetPictureQuery({ id: String(pictureId) || id });

  useEffect(() => {
    dispatch(setDetailsPageLoading(true));
    if (data) {
      dispatch(setDetails(data));
      dispatch(setDetailsPageLoading(false));
    }
  }, [data, dispatch, pictureId]);

  return (
    <ErrorBoundary>
      <div className="bg-light position-relative z-0">
        <Search />
        <ItemsPerPage />
        <Pagination />
        {!mainPageLoading ? <Cards /> : <h2>Loading...</h2>}
        <Pagination />
      </div>
      {pictureId && <Details />}
    </ErrorBoundary>
  );
};

export default DetailsPage;
