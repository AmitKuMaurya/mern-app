import React, { useEffect } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import SearchBar from "../search-bar/SearchBar";
const Navbar = () => {
  const token = JSON.parse(localStorage.getItem("token") || null);
  console.log("token: ", token);
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
          justifyContent: "space-evenly",
          backgroundColor: "#F7F663",
          height: "60px",
          margin: "0px",
          padding: "0px",
        }}
      >
        <li style={{}}>
          <Link to={"/"}>Hello</Link>
        </li>
        <li>
          <SearchBar />
        </li>
        <li>
          {!token ? (
            <Link to={"/login"}>
              <Button>Login</Button>
            </Link>
          ) : (
            <Button onClick={() => handleLogout()}>Logout</Button>
          )}
        </li>
      </ul>
    </>
  );
};

export default Navbar;
