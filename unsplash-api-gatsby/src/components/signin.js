// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { Button, Grid, Typography } from "@material-ui/core"
import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import { FlexCenterGrid } from "../helpers/styledcomponents"

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
const LandingLinks = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-weight: bold;
`

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export const SignIn = () => (
  <SignInDiv>
    <SignInGrid item>
      <LandingpageMainText variant="h1">
        Something like Unsplash
      </LandingpageMainText>
    </SignInGrid>
    <ButtonGrid>
      <Button style={{ color: "#fff" }}>Sign in</Button>
      <Button style={{ color: "#fff" }}>Create account</Button>
      <LandingLinks to="/main" style={{ color: "#fff" }}>
        Continue
      </LandingLinks>
    </ButtonGrid>
  </SignInDiv>
)

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
