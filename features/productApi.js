import { createApi, fetchBaseQuery  } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({baseUrl: "https://api.kreditlineltd.info/"}),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => "api/products"
        }),
        getID: builder.query({
            query: (id) => `api/products/${id}`
        }),
     
    })

})

export const { useGetAllProductsQuery,useGetIDQuery } = productsApi