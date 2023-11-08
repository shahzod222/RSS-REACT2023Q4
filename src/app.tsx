import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search } from './components/search';
import { Cards } from './components/cards';
import { ErrorBoundary } from './errorboundary';
import { Details } from './components/details';
import { Pagination } from './components/pagination';
import { ItemsPerPage } from './components/itemPerPage';

export function App() {
  const { pageNumber, pictureNumber } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState(localStorage.getItem('search') || '');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(Number(pageNumber));
  const [details, setDetails] = useState(null);
  const [pictureId, setPictureId] = useState(pictureNumber || null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (pictureId) {
      navigate(`/page/${page}/details/${pictureId}`);
      getPicture();
    }
  }, [pictureId, itemsPerPage]);

  useEffect(() => {
    setData([]);
    getData();
  }, [page, itemsPerPage]);

  useEffect(() => {
    localStorage.setItem('search', search);
  }, [search]);

  const getData = () => {
    const accessKey = 'wb6DTO5KrTRFyhIOh2iCJIjze5o_YbPM3Z7-Umd4myM';
    const apiUrl = `https://api.unsplash.com/search/photos?page=${page}&per_page=${itemsPerPage}&query=${
      search || 'nature'
    }`;
    setIsLoading(true);

    fetch(apiUrl, {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length !== 0) {
          setData(data.results);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const getPicture = (id: string | null = pictureId) => {
    const accessKey = 'wb6DTO5KrTRFyhIOh2iCJIjze5o_YbPM3Z7-Umd4myM';
    const apiUrl = `https://api.unsplash.com/photos/${id}`;
    setIsLoading(true);

    fetch(apiUrl, {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDetails(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
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

  const handleClose = () => {
    setPictureId(null);
    navigate(`/page/${page}`);
    setDetails(null);
  };

  return (
    <ErrorBoundary>
      <div className="bg-light position-relative z-0">
        {pictureId && (
          <Details data={details} handleClose={handleClose} pictureNumber={pictureId} />
        )}
        <Search search={search} onSearchChange={handleSearchChange} onSearchClick={handleSearch} />
        {!isLoading ? (
          <>
            <ItemsPerPage changeItemsPerPage={setItemsPerPage} page={setPage} />
            <Pagination page={page} setPage={setPage} />
            <Cards data={data} setPictureId={setPictureId} />
            <Pagination page={page} setPage={setPage} />
          </>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </ErrorBoundary>
  );
}
