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

const NavbarSitename = styled(Link)`
  display: none;
  @media (min-width: 708px) {
    color: #fff;
    font-family: "Pacifico";
    display: initial;
    padding-right: 10em;
    z-index: 99999;
    text-decoration: none;
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
      <NavbarSitename to="/main">
        Something like Unsplash
      </NavbarSitename>
      <MobileNavMenu user={user} />
    </Toolbar>
  </AppBar>
)

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
