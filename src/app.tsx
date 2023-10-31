import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Search from './components/search';
import { Cards } from './components/card';
import { ErrorBoundary } from './errorboundary';
import { Pagination } from './components/pagination';

export function App() {
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState(localStorage.getItem('search') || '');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(Number(pageNumber));
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    setData([]);
    getData();
  }, [page]);

  useEffect(() => {
    localStorage.setItem('search', search);
  }, [search]);

  const getData = () => {
    const apiKey = '1e78e4c09cd2d96c02dfecde6654a420';
    const defaultUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&page=${page}`;
    const url =
      search !== ''
        ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}&page=${page}`
        : defaultUrl;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLastPage(data.total_pages);
        setData(data.results);
        if (data.results.length === 0) {
          navigate('/404');
        }
      });
  };

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
  };

  const handleSearch = () => {
    setData([]);
    getData();
    setPage(1);
    navigate('/page/1');
  };

  const changePage = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <ErrorBoundary>
      <div className="bg-light">
        <Search search={search} onSearchChange={handleSearchChange} onSearchClick={handleSearch} />
        {data.length !== 0 && <Pagination page={page} setPage={changePage} lastPage={lastPage} />}
        <Cards data={data} />
        {data.length !== 0 && <Pagination page={page} setPage={changePage} lastPage={lastPage} />}
      </div>
    </ErrorBoundary>
  );
}
