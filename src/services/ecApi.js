import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url } from "../firebase/database";

export const ecApi = createApi({
  reducerPath: "ecApi",
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
  }),
  endpoints: (builder) => ({
    getGenres: builder.query({
      query: () => "genres.json",
    }),

    getBooks: builder.query({
      query: () => "booksapi.json",
    }),

    // PUBLISH BOOKS API
    putBook: builder.mutation({
      query: (book) => ({
        url: "booksapi.json",
        method: "POST",
        body: book,
      }),
    }),
    // ACCESO A LA IMAGEN EN LA BD
    getImage: builder.query({
      query: () => "image.json",
    }),

    // ENVIA LA IMAGEN A LA BD
    putImage: builder.mutation({
      query: (image) => ({
        url: "image.json",
        method: "PUT",
        body: image,
      }),
    }),

  }),
});

export const { 
  useGetGenresQuery, 
  useGetBooksQuery,
  useGetImageQuery,
  usePutImageMutation, 
  usePutBookMutation
} = ecApi;