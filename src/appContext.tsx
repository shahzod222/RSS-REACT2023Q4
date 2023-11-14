import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Picture } from './types';
import { useNavigate } from 'react-router-dom';

export interface AppContextProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  data: Picture[];
  setData: React.Dispatch<React.SetStateAction<Picture[]>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  details: Picture | null;
  setDetails: React.Dispatch<React.SetStateAction<Picture | null>>;
  pictureId: string | null;
  setPictureId: React.Dispatch<React.SetStateAction<string | null>>;
  itemsPerPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getData: () => void;
  getPicture: (id: string | null) => void;
  handleSearch: () => void;
  handleClose: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState(localStorage.getItem('search') || '');
  const [data, setData] = useState<Picture[]>([]);
  const [page, setPage] = useState<number>(1);
  const [details, setDetails] = useState<Picture | null>(null);
  const [pictureId, setPictureId] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSearch = () => {
    setData([]);
    getData();
  };

  const handleClose = () => {
    setPictureId(null);
    navigate(`/page/${page}`);
    setDetails(null);
  };

  return (
    <AppContext.Provider
      value={{
        search,
        setSearch,
        data,
        setData,
        page,
        setPage,
        details,
        setDetails,
        pictureId,
        setPictureId,
        itemsPerPage,
        setItemsPerPage,
        isLoading,
        setIsLoading,
        getData,
        getPicture,
        handleSearch,
        handleClose,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
