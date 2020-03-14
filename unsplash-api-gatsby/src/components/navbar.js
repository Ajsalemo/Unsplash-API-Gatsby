// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { AppBar, Toolbar, Typography } from "@material-ui/core"
import React from "react"
import styled from "styled-components"

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
  height: 3em;
  @media (min-width: 600px) {
    width: fit-content;
    padding: 0em;
  }
`
const NavbarSiteName = styled(Typography)`
  align-items: center;
  display: flex;
  font-family: "Pacifico";
  font-size: 1.1em;
`
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export const Navbar = () => (
  <StyledNavbar position="absolute">
    <Toolbar style={{ justifyContent: "center" }}>
      <ParentNavDiv>
        <NavbarSiteName variant="h1">Something like Unsplash</NavbarSiteName>
      </ParentNavDiv>
    </Toolbar>
  </StyledNavbar>
)

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
