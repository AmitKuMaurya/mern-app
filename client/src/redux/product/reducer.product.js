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

    case Types.NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
        success: action.payload,
      };
    case Types.NEW_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Types.NEW_PRODUCT_RESET:
      return {
        ...state,
        success: false,
      };

    case Types.DELETE_PRODUCT_REQUEST:
    case Types.UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case Types.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case Types.DELETE_PRODUCT_FAIL:
    case Types.UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Types.DELETE_PRODUCT_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case Types.UPDATE_PRODUCT_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    default:
      return state;
  }
};
