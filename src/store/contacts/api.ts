import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_API_URL }),
  tagTypes: ["contacts"],
  endpoints: (builder) => ({
    getContacts: builder.query<IContact[], void>({
      query: () => "/contacts",
      providesTags: ["contacts"],
      transformResponse: (response: IContact[]) => {
        return response.reverse();
      },
    }),
    getContactById: builder.query<IContact, number>({
      query: (id) => `/contacts/${id}`,
    }),
    addContact: builder.mutation<IContact, IContact>({
      query: (contact) => ({
        url: "/contacts",
        body: contact,
        method: "POST",
      }),
      invalidatesTags: ["contacts"],
    }),
    updateContact: builder.mutation<IContact, IContact>({
      query: (contact) => ({
        url: `/contacts/${contact.id}`,
        body: contact,
        method: "PATCH",
      }),
      invalidatesTags: ["contacts"],
    }),
    deleteContact: builder.mutation<void, number>({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["contacts"],
    }),
  }),
});

export default contactApi;
