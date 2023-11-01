import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search } from './components/search';
import { Cards } from './components/cards';
import { ErrorBoundary } from './errorboundary';
import { Pagination } from './components/pagination';
import { Details } from './components/details';

export function App() {
  const { pageNumber, movieNumber } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState(localStorage.getItem('search') || '');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(Number(pageNumber));
  const [lastPage, setLastPage] = useState(0);
  const [details, setDetails] = useState(null);
  const [movieId, setMovieId] = useState(Number(movieNumber) || null);

  useEffect(() => {
    if (movieId) {
      navigate(`/page/${page}/details/${movieId}`);
      getMovie();
    }
  }, [movieId]);

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

  const getMovie = (id: number = Number(movieId)) => {
    const apiKey = '1e78e4c09cd2d96c02dfecde6654a420';
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        data !== null ? setDetails(data) : navigate('/404');
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

  const handleClose = () => {
    setMovieId(null);
    navigate(`/page/${page}`);
    setDetails(null);
  };

  return (
    <ErrorBoundary>
      <div className="bg-light position-relative z-0">
        {movieId && <Details data={details} handleClose={handleClose} movieNumber={movieId} />}
        <Search search={search} onSearchChange={handleSearchChange} onSearchClick={handleSearch} />
        {data.length !== 0 && <Pagination page={page} setPage={changePage} lastPage={lastPage} />}
        <Cards data={data} page={page} setMovieId={setMovieId} />
        {data.length !== 0 && <Pagination page={page} setPage={changePage} lastPage={lastPage} />}
      </div>
    </ErrorBoundary>
  );
}
