import * as Types from "./types.product";
import axios from "axios";
import { BASE_URL } from "../../../index";

// currentPage = 1,price=[0,10000],ratings=0
export const getProducts = ( currentPage = 1, price = [0, 10000], category, ratings = 0) => async(dispatch) =>{
    try{
        dispatch({ type : Types.GET_PRODUCT_LOADING});

        let link =`${BASE_URL}/products`;

        // if(currentPage || price || ratings){
        //   link = `${BASE_URL}/products?page=${currentPage}&ratings[gte]=${ratings}&price[gte]=${price[0]}&price[lte]=${price[1]}`
        // }
        // ?
        if(category){
          link = `${BASE_URL}/products?page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
        }
        const {data} = await axios.get(link);
        // console.log(data)
        dispatch({ type : Types.GET_PRODUCT_SUCCESS,
        payload:data
    }) 

    } catch(error){
        dispatch({ type: Types.GET_PRODUCT_ERROR,
        payload : error.response.data.message
        })
    }
}

// create any product which is done by Admin only
  export const createNewProduct = (productData,token) => async (dispatch) => {
    try {
      dispatch({ type: Types.NEW_PRODUCT_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          'authorization': `Bearer ${token}`
        },
      };
      console.log("token :",token);
  
      const { data } = await axios.post(
        `${BASE_URL}/admin/product/new`,
        productData,
        config
      );
  
      dispatch({
        type: Types.NEW_PRODUCT_SUCCESS,
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: Types.NEW_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
      console.log(error);
    }
  };

  
  // Delete Product 
export const deleteProduct = (id,token) => async (dispatch) => {
  try {
    dispatch({ type: Types.DELETE_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        'authorization': `Bearer ${token}`
      },
    };
    
    const { data } = await axios.delete(`${BASE_URL}/admin/product/${id}`,config);

    dispatch({
      type: Types.DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: Types.DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update an product


export const updateProduct = (id,productData,token) => async (dispatch) => {
  try {
    dispatch({ type: Types.UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: {
      "Content-Type": "multipart/form-data", 
      'authorization': `Bearer ${token}`
      },
    };

    const { data } = await axios.put(
      `${BASE_URL}/admin/product/${id}`,
      productData,
      config
    );

    dispatch({
      type: Types.UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: Types.UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
    console.log(error);
  }
};

