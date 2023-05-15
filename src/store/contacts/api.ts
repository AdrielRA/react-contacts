import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_API_URL }),
  tagTypes: ["contacts"],
  endpoints: (builder) => ({
    getContacts: builder.query<IContact[], void>({
      query: () => "/contacts",
      providesTags: ["contacts"],
    }),
    getContactById: builder.query<IContact, string>({
      query: (id) => `/contacts/${id}`,
      providesTags: (result) =>
        result?.id
          ? [{ type: "contacts" as const, id: result.id }, "contacts"]
          : ["contacts"],
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
      invalidatesTags: (_, __, arg) => [{ type: "contacts", id: arg.id }],
    }),
    deleteContact: builder.mutation<void, string>({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [{ type: "contacts", id }],
    }),
  }),
});

export default contactApi;
