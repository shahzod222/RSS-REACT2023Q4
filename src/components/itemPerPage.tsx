import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSearch,
  setData,
  setMainPageLoading,
  selectItemsPerPage,
  selectPage,
  setItemsPerPage,
  setPage,
} from '../store';
import { api } from '../api';

export function ItemsPerPage() {
  const dispatch = useDispatch();

  const search: string = useSelector(selectSearch);
  const itemsPerPage: number = useSelector(selectItemsPerPage);
  const page: number = useSelector(selectPage);

  const { data } = api.useGetDataQuery({
    pageNumber: page,
    itemsPerPage: itemsPerPage,
    search: search,
  });

  useEffect(() => {
    dispatch(setMainPageLoading(true));
    if (data) {
      dispatch(setData(data.results));
      dispatch(setMainPageLoading(false));
    }
  }, [data]);

  const handleChange = (value: number) => {
    dispatch(setItemsPerPage(value));
    dispatch(setPage(1));
  };

  return (
    <div className="container d-flex justify-content-center">
      <h3>Items per page: </h3>
      <button className="btn btn-outline-dark px-4 mx-2" onClick={() => handleChange(10)}>
        10
      </button>
      <button className="btn btn-outline-dark px-4 mx-2" onClick={() => handleChange(15)}>
        15
      </button>
      <button className="btn btn-outline-dark px-4 mx-2" onClick={() => handleChange(20)}>
        20
      </button>
    </div>
  );
}
