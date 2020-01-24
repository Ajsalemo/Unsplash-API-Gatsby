// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { AppBar, Grid, Toolbar, Typography } from "@material-ui/core"
import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import { MobileNavMenu } from "./mobilenavmenu"
import { SearchForm } from "./searchform"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const NavbarSitename = styled(Typography)`
  display: none;
  @media (min-width: 700px) {
    color: #fff;
    font-family: "Pacifico";
    display: initial;
  }
`
const MainNavLinks = styled(Grid)`
  display: none;
  @media (min-width: 700px) {
    display: flex;
    justify-content: space-between;
  }
`

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export const MainNavbar = () => (
  <AppBar
    style={{ backgroundColor: "#1e172f", boxShadow: "1px 1px #fff" }}
    position="fixed"
  >
    <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
      <SearchForm />
      <Link to="/" style={{ textDecoration: "none" }}>
        <NavbarSitename>Something like Unsplash</NavbarSitename>
      </Link>
      <MainNavLinks item sm={2} md={2} lg={1} xl={1}>
        <Link to="/main" style={{ color: "#fff", textDecoration: "none" }}>
          <Typography>Home</Typography>
        </Link>
        <Typography>Sign in</Typography>
      </MainNavLinks>
      <MobileNavMenu />
    </Toolbar>
  </AppBar>
)

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
