// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { Button, Grid, Typography } from "@material-ui/core"
import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const SignInDiv = styled.div`
    position: absolute;
    top: 50%;
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    padding-left: 4em;
    @media (min-width: 990px) {
        display: flex;
        flex-direction: row;
    }
`
const SignInGrid = styled(Grid)`
    justify-content: center;
    padding: 4em;
    @media (min-width: 600px) {
        display: flex;
    }
`
const LandingpageMainText = styled(Typography)`
    color: #fff;
    font-family: "Pacifico"; 
    font-size: 5em;
`
const ButtonGrid = styled(Grid)`
    display: flex;
    justify-content: center;
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
            <LandingpageMainText variant="h1">Something like Unsplash</LandingpageMainText>
        </SignInGrid>
        <ButtonGrid>
            <Button style={{ color: "#fff" }}>Sign in</Button>
            <Button style={{ color: "#fff" }}>Create account</Button>
            <LandingLinks to="/main" style={{ color: "#fff" }}>Continue</LandingLinks>
        </ButtonGrid>
    </SignInDiv>
)

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
