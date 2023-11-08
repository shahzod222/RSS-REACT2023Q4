import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search } from './components/search';
import { Cards } from './components/cards';
import { ErrorBoundary } from './errorboundary';
import { Pagination } from './components/pagination';
import { Details } from './components/details';
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

    fetch(apiUrl, {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data.results);
        console.log(data.results);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const getPicture = (id: string | null = pictureId) => {
    const accessKey = 'wb6DTO5KrTRFyhIOh2iCJIjze5o_YbPM3Z7-Umd4myM';
    const apiUrl = `https://api.unsplash.com/photos/${id}`;

    fetch(apiUrl, {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDetails(data);
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

  const changePage = (newPage: number) => {
    setPage(newPage);
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
        <ItemsPerPage change={setItemsPerPage} page={setPage} />
        <Pagination page={page} setPage={changePage} />
        <Cards data={data} page={page} setPictureId={setPictureId} />
        <Pagination page={page} setPage={changePage} />
      </div>
    </ErrorBoundary>
  );
}
