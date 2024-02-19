// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom'; // If using React Router
import styled from 'styled-components';

const NavbarWrapper = styled.nav`
  background-color: #3498db;
  padding: 10px;
`;

const NavList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-around;
`;

const NavItem = styled.li`
  margin: 0;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = () => {
  return (
    <NavbarWrapper>
      <NavList>
        <NavItem>
          <NavLink to="/profile">Profile</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/overview_page">Exercise Overview</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/logout">Logout</NavLink>
        </NavItem>
      </NavList>
    </NavbarWrapper>
  );
};

export default Navbar;
