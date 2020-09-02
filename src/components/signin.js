// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { Button, Grid, Typography } from "@material-ui/core"
import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import { FlexCenterGrid } from "../helpers/styledcomponents"
import { login } from "../utils/auth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const SignInDiv = styled.div`
  position: absolute;
  top: 40%;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  @media (min-width: 600px) {
    padding-left: 4em;
    top: 50%;
  }
  @media (min-width: 990px) {
    display: flex;
    flex-direction: row;
  }
`
const SignInGrid = styled(Grid)`
  justify-content: center;
  @media (min-width: 600px) {
    display: flex;
    padding: 4em;
  }
`
const LandingpageMainText = styled(Typography)`
  color: #fff;
  font-family: "Pacifico";
  font-size: 5em;
  padding-bottom: 0.4em;
`
const ButtonGrid = styled(FlexCenterGrid)`
  flex-direction: column;
`
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export const SignIn = ({ user }) => (
  <SignInDiv>
    <SignInGrid item>
      <LandingpageMainText variant="h1">
        Something like Unsplash
      </LandingpageMainText>
    </SignInGrid>
    <ButtonGrid>
      {user.name ? null : (
        <Button style={{ color: "#fff" }} onClick={() => login()}>
          Log in/Sign up
        </Button>
      )}
      <Link to="/main" style={{ color: "#fff", fontWeight: "bold" }}>
        Continue to site without logging in
        <FontAwesomeIcon icon={faArrowAltCircleRight} style={{ marginLeft: "0.5em" }} />
      </Link>
    </ButtonGrid>
  </SignInDiv>
)

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
