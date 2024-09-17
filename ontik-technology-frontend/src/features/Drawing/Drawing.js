import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const drawingApi = createApi({
  reducerPath: "drawingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/",
  }),

  tagTypes: ["drawing"], // Define the tag type
  endpoints: (build) => ({
    createDrawing: build.mutation({
      query: (data) => ({
        url: "/drawing/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["drawing"],
    }),

    getSingleDrawing: build.query({
        query: (id) => ({
          url: `/drawing/${id}`,
        }),
        invalidatesTags: ["drawing"],
      }),
    deleteDrawing: build.mutation({
      query: (id) => ({
        url: `/drawing/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["drawing"],
    }),

    updateDrawing: build.mutation({
      query: ({ id, data }) => ({
        url: `/drawing/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["drawing"],
    }),

    getAllDrawing: build.query({
      query: () => ({
        url: "/drawing",
      }),
      providesTags: ["drawing"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
    useCreateDrawingMutation,
    useGetAllDrawingQuery,
    useGetSingleDrawingQuery,
    useDeleteDrawingMutation,
    useUpdateDrawingMutation
} = drawingApi;