import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Picture } from './types';

const accessKey = 'wb6DTO5KrTRFyhIOh2iCJIjze5o_YbPM3Z7-Umd4myM';
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.unsplash.com/',
  prepareHeaders(headers) {
    headers.set('Authorization', `Client-ID ${accessKey}`);
    return headers;
  },
});

export const api = createApi({
  baseQuery,
  endpoints: (builder) => ({
    getData: builder.query<
      { results: Picture[] },
      { pageNumber: number; itemsPerPage: number; search: string }
    >({
      query: ({ pageNumber, itemsPerPage, search }) =>
        `search/photos?page=${pageNumber}&per_page=${itemsPerPage}&query=${search || 'nature'}`,
    }),
    getPicture: builder.query<Picture, { id: string }>({
      query: ({ id }) => `photos/${id}`,
    }),
  }),
});

export const { useGetDataQuery, useGetPictureQuery } = api;
