import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav";


const Header = () => {
 
  return (
    <MainHeader>
   
     

      <NavLink to="/">
        <h2
          style={{
            border: "3px solid blue",
            borderRadius: 10,
            padding: "5px",
            backgroundColor: "skyblue",
          }}
        >
          <span style={{ color: "purple", fontFamily: "fantasy" }}>
            <b> Niranjan</b>
          </span>{" "}
          Store
        </h2>
      </NavLink>

      <Nav />
    </MainHeader>
  );
};

const MainHeader = styled.header`
  padding: 0 4.8rem;
  height: 10rem;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: space-between;
  align-items: center;
 

  .logo {
    height: 5rem;

  }

  
`;
export default Header;
