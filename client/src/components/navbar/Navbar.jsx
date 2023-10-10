import React, { useEffect } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import SearchBar from "../search-bar/SearchBar";
const Navbar = () => {
  const token = JSON.parse(localStorage.getItem("token") || null);
  useEffect(() => {}, []);
  const handleLogout = () => {
    localStorage.clear();
  };
  return (
    <>
      <ul
        style={{
          display: "flex",
          alignItems: "center",
          listStyleType: "none",
          justifyContent: "flex-end",
          backgroundColor: "#F7F663",
          height: "60px",
          margin: "0px",
          padding: "0px",
        }}
      >
        <li style={{marginRight:"4%"}}>
          <Link to={"/"}>Home</Link>
        </li>
        <li style={{marginRight:"4%"}}>
          <SearchBar />
        </li>
        <li style={{marginRight:"4%"}}>
          {!token ? (
            <Link to={"/login"}>
              <Button>Login</Button>
            </Link>
          ) : (
            <Button onClick={() => handleLogout()}>Logout</Button>
          )}
        </li>
        <li style={{marginRight:"4%"}}>
        <Link to={"/register"}>
              <Button>Register</Button>
            </Link>
        </li>
      </ul>
    </>
  );
};

export default Navbar;
