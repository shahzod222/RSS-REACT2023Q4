import React, { createContext, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setPictureId,
  setMainPageLoading,
  setDetailsPageLoading,
  setData,
  selectSearch,
  selectPage,
  selectPictureId,
  setDetails,
  selectItemsPerPage,
} from './store';

export interface AppContextProps {
  getData: () => void;
  getPicture: (id: string | null) => void;
  handleClose: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);
  const page = useSelector(selectPage);
  const pictureId = useSelector(selectPictureId);
  const itemsPerPage = useSelector(selectItemsPerPage);

  const getData = () => {
    const accessKey = 'wb6DTO5KrTRFyhIOh2iCJIjze5o_YbPM3Z7-Umd4myM';
    const apiUrl = `https://api.unsplash.com/search/photos?page=${page}&per_page=${itemsPerPage}&query=${
      search || 'nature'
    }`;

    dispatch(setMainPageLoading(true));

    fetch(apiUrl, {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length !== 0) {
          dispatch(setData(data.results));
        }
        dispatch(setMainPageLoading(false));
      })
      .catch((error) => {
        console.error('Error:', error);
        dispatch(setMainPageLoading(false));
      });
  };

  const getPicture = (id: string | null = pictureId) => {
    const accessKey = 'wb6DTO5KrTRFyhIOh2iCJIjze5o_YbPM3Z7-Umd4myM';
    const apiUrl = `https://api.unsplash.com/photos/${id}`;

    dispatch(setDetailsPageLoading(true));

    fetch(apiUrl, {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(setDetailsPageLoading(false));
        dispatch(setDetails(data));
      })
      .catch((error) => {
        dispatch(setDetailsPageLoading(false));
        console.error('Error:', error);
      });
  };

  const handleClose = () => {
    dispatch(setPictureId(null));
    navigate(`/page/${page}`);
  };

  return (
    <AppContext.Provider
      value={{
        getData,
        getPicture,
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
