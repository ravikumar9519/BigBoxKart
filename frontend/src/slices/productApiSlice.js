import { PRODUCT_URL, UPLOAD_URL, USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCT_URL,
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
    getProductDetail: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCT_URL,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data.productId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: "POST",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    searchPage: builder.query({
      query: (keyword) => ({
        url: `${PRODUCT_URL}/search/${keyword}`,
        method: "POST",
      }),
      providesTags: ["Product"],
    }),
    getFood: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/foods`,
        method: "POST",
      }),
      providesTags: ["Product"],
    }),
    getBook: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/books`,
        method: "POST",
      }),
      providesTags: ["Product"],
    }),
    getElectronics: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/electronics`,
        method: "POST",
      }),
      providesTags: ["Product"],
    }),
  }),
});
export const {
  useGetProductsQuery,
  useGetProductDetailQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useSearchPageQuery,
  useGetBookQuery,
  useGetFoodQuery,
  useGetElectronicsQuery,
} = productsApiSlice;
