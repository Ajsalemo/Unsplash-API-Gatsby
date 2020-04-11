// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { AppBar, Toolbar, Typography } from "@material-ui/core"
import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import { MobileNavMenu } from "./mobilenavmenu"
import { SearchForm } from "./searchform"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const NavbarSitename = styled(Typography)`
  display: none;
  @media (min-width: 708px) {
    color: #fff;
    font-family: "Pacifico";
    display: initial;
    padding-right: 10em;
    z-index: 99999;
  }
`
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export const MainNavbar = ({ user }) => (
  <AppBar
    style={{ backgroundColor: "#1e172f", boxShadow: "1px 1px #fff" }}
    position="fixed"
  >
    <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
      <SearchForm />
      <Link to="/main" style={{ textDecoration: "none" }}>
        <NavbarSitename>Something like Unsplash</NavbarSitename>
      </Link>
      <MobileNavMenu user={user} />
    </Toolbar>
  </AppBar>
)

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
