import { useState, useEffect } from 'react';
import Search from './components/search';
import { Cards } from './components/card';
import { ErrorBoundary } from './errorboundary';

export function App() {
  const [search, setSearch] = useState(localStorage.getItem('search') || '');
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    localStorage.setItem('search', search);
  }, [search]);

  const getData = () => {
    const apiKey = '1e78e4c09cd2d96c02dfecde6654a420';
    const defaultUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`;
    const url =
      search !== ''
        ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}`
        : defaultUrl;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
      });
  };

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
  };

  const handleSearchClick = () => {
    setData([]);
    getData();
  };

  return (
    <ErrorBoundary>
      <div className="bg-light">
        <Search
          search={search}
          onSearchChange={handleSearchChange}
          onSearchClick={handleSearchClick}
        />
        <Cards data={data} />
      </div>
    </ErrorBoundary>
  );
}
