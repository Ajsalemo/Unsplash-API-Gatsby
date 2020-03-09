// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { AppBar, Button, Grid, Toolbar, Typography } from "@material-ui/core"
import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import { login } from "../utils/auth"
import { MobileNavMenu } from "./mobilenavmenu"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const StyledNavbar = styled(AppBar)`
  background-color: transparent;
  box-shadow: none;
`
const ParentNavDiv = styled.div`
  display: flex;
  flex-basis: 90%;
  padding: 0.5em;
  margin-top: 0.5em;
  justify-content: space-around;
  box-shadow: 1px 1px 1px 2px #000;
  background-color: #000000a1;
  @media (min-width: 600px) {
    width: fit-content;
    padding: 0em;
  }
`
const ParentNavGrid = styled(Grid)`
  display: none;
  @media (min-width: 700px) {
    align-items: center;
    display: flex;
    justify-content: space-around;
    padding: 1em;
  }
`
const NavbarSiteName = styled(Typography)`
  align-items: center;
  display: flex;
  font-family: "Pacifico";
  font-size: 1.1em;
`
const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export const Navbar = ({ user }) => (
  <StyledNavbar position="absolute">
    <Toolbar style={{ justifyContent: "center" }}>
      <ParentNavDiv>
        <NavbarSiteName variant="h1">Something like Unsplash</NavbarSiteName>
        <ParentNavGrid item xs={10} sm={8} md={4} lg={4}>
          <NavLink to="/main">
            <Button style={{ color: "#fff" }}>Continue</Button>
          </NavLink>
          {!user ? (
            <Button style={{ color: "#fff" }} onClick={() => login()}>
              Sign in
            </Button>
          ) : null}
        </ParentNavGrid>
        <MobileNavMenu user={user} />
      </ParentNavDiv>
    </Toolbar>
  </StyledNavbar>
)

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
