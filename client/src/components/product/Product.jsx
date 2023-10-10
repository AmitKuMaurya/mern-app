import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getProducts } from '../../redux/product/action.product';

const Product = () => {

    const dispatch = useDispatch();

    useEffect(()=>{
        const token = JSON.parse(localStorage.getItem("token") || null);
        dispatch(getProducts(token));
    },[dispatch]);

  return (
    <>
    </>
  )
}

export default Product