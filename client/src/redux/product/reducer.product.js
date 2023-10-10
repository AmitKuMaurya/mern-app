import * as Types from "./types.product";

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case Types.GET_PRODUCT_LOADING:
      return { loading: true, products: [] };

    case Types.GET_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        resultPerPage: action.payload.resultPerPage,
        filteredProductsCount: action.payload.filteredProductsCount,
      };

    case Types.GET_PRODUCT_ERROR:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
