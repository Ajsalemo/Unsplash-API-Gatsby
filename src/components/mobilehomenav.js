// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { AppBar, Toolbar, Typography } from "@material-ui/core"
import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const MobileLinkToHomeAppBar = styled(AppBar)`
  z-index: 1;
  margin: -0.5em 0 2em 0;
  padding-top: 0.5em;
  background-color: #1e172f;
  @media (min-width: 708px) {
    display: none;
  }
`
const MobileLinkToHomeTypography = styled(Typography)`
  font-family: "Pacifico";
  color: #fff;
  text-align: center;
`
const MobileLinkToHomeToolbar = styled(Toolbar)`
  background-color: #1e172f;
  display: flex;
  justify-content: center;
`
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export const MobileHomeNav = () => (
  <MobileLinkToHomeAppBar position="static">
    <MobileLinkToHomeToolbar>
      <Link to="/main" style={{ textDecoration: "none" }}>
        <MobileLinkToHomeTypography>
          Something like Unsplash
        </MobileLinkToHomeTypography>
      </Link>
    </MobileLinkToHomeToolbar>
  </MobileLinkToHomeAppBar>
)

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
