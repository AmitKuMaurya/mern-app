import { Input } from 'antd'
import React from 'react'

const SearchBar = () => {
  return (
    <>
      <Input type='text' style={{width : "100%", maxWidth : "400px"}} placeholder='Search product by name...'/>
    </>
  )
}

export default SearchBar