import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Picture } from './types';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    search: localStorage.getItem('search') || '',
    data: [],
    page: 1,
    details: null,
    pictureId: null,
    itemsPerPage: 10,
    isLoading: false,
    mainPageLoading: false,
    detailsPageLoading: false,
    viewMode: 'grid',
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setDetails: (state, action) => {
      state.details = action.payload;
    },
    setPictureId: (state, action) => {
      state.pictureId = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setMainPageLoading: (state, action) => {
      state.mainPageLoading = action.payload;
    },
    setDetailsPageLoading: (state, action) => {
      state.detailsPageLoading = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
  },
});

export const {
  setSearch,
  setData,
  setPage,
  setDetails,
  setPictureId,
  setItemsPerPage,
  setIsLoading,
  setMainPageLoading,
  setDetailsPageLoading,
  setViewMode,
} = appSlice.actions;

export const selectSearch = (state: { app: { search: string } }) => state.app.search;
export const selectData = (state: { app: { data: Picture[] } }) => state.app.data;
export const selectPage = (state: { app: { page: number } }) => state.app.page;
export const selectDetails = (state: { app: { details: Picture } }) => state.app.details;
export const selectPictureId = (state: { app: { pictureId: string } }) => state.app.pictureId;
export const selectItemsPerPage = (state: { app: { itemsPerPage: number } }) =>
  state.app.itemsPerPage;
export const selectIsLoading = (state: { app: { isLoading: boolean } }) => state.app.isLoading;
export const selectMainPageLoading = (state: { app: { mainPageLoading: boolean } }) =>
  state.app.mainPageLoading;
export const selectDetailsPageLoading = (state: { app: { detailsPageLoading: boolean } }) =>
  state.app.detailsPageLoading;
export const selectViewMode = (state: { app: { viewMode: string } }) => state.app.viewMode;

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});
