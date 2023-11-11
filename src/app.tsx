import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Search } from './components/search';
import { Cards } from './components/cards';
import { ErrorBoundary } from './errorboundary';
import { Details } from './components/details';
import { Pagination } from './components/pagination';
import { ItemsPerPage } from './components/itemPerPage';
import { useAppContext } from './appContext';

export function App() {
  const navigate = useNavigate();
  const { pageNumber } = useParams();
  const {
    search,
    setData,
    page,
    pictureId,
    itemsPerPage,
    isLoading,
    getData,
    getPicture,
    setPage,
  } = useAppContext();

  if (pageNumber) setPage(Number(pageNumber));

  useEffect(() => {
    if (pictureId) {
      navigate(`/page/${page}/details/${pictureId}`);
      getPicture(pictureId);
    }
  }, [pictureId, itemsPerPage]);

  useEffect(() => {
    localStorage.setItem('search', search);
  }, [search]);

  useEffect(() => {
    setData([]);
    getData();
  }, [page, itemsPerPage]);

  return (
    <ErrorBoundary>
      <div className="bg-light position-relative z-0">
        <Search />
        {!isLoading ? (
          <>
            <ItemsPerPage />
            <Pagination />
            <Cards />
            <Pagination />
          </>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
      {pictureId && <Details />}
    </ErrorBoundary>
  );
}
