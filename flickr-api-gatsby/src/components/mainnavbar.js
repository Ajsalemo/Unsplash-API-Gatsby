// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import {
  AppBar,
  Grid,
  Toolbar,
  Button,
  TextField,
  InputAdornment,
  Typography,
} from "@material-ui/core"
import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link } from "gatsby"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const StyledTextField = styled(TextField)`
    .MuiInput-underline:before {
        border-bottom: 2px solid #fff;
    }
    /* hover (double-ampersand needed for specificity reasons. */
    && .MuiInput-underline:hover:before {
        border-bottom: 2px solid lightblue;
    }
    /* focused */
    .MuiInput-underline:after {
        border-bottom: 2px solid #f00;
    }
    .MuiInputBase-input {
        color: #fff;
    }
`
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
  <AppBar style={{ backgroundColor: "#1e172f", boxShadow: "1px 1px #fff" }} position="fixed">
    <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <StyledTextField
          id="main_nav"
          placeholder="Search for images"
          name="main_nav_search"
          InputProps={{
            startAdornment:
                <InputAdornment position="start">
                    <FontAwesomeIcon icon={faSearch} style={{ color: "#fff" }} />
                </InputAdornment>
          }}
        />
        <Link to="/" style={{ textDecoration: "none" }}>
            <NavbarSitename>Something like Unsplash</NavbarSitename>
        </Link>
        <MainNavLinks item sm={2} md={2} lg={1} xl={1}>
            <Typography>Home</Typography>
            <Typography>Sign in</Typography>
        </MainNavLinks>
    </Toolbar>
  </AppBar>
)

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //