// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Avatar, Grid, Typography } from "@material-ui/core"
import React from "react"
import styled from "styled-components"
import { FlexCenterGrid } from "../helpers/styledcomponents"
import { animateScroll as scroll } from "react-scroll"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const StyledFooter = styled(FlexCenterGrid)`
  height: 16em;
  background-color: #1e172f;
  border-top: 2px solid #fff;
`
const StyledFooterGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-evenly;
`
const UpperFooterTypography = styled(Typography)`
  color: #fff;
  font-family: Pacifico;
  padding-top: 0.4em;
`
const FooterSubtextGrid = styled(Grid)`
  color: #fff;
  display: flex;
  justify-content: space-around;
`
const FooterLinks = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 0.8em;
  &:hover {
    text-decoration: underline;
  }
`
const BackToTopButton = styled(Avatar)`
  align-self: center;
  border: 2px solid #fff;
  margin-top: -2.8em;
  background-color: #1e172f;
  transition: all .5s ease-in-out;
  &:hover {
    cursor: pointer;
    border: 2px solid red;
    transition: all .5s ease-in-out;
    transform: scale(1.1);
  }
`

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export const Footer = () => (
  <StyledFooter container>
    <StyledFooterGrid item xs={8} sm={6} md={5} lg={3}>
      <BackToTopButton onClick={() => scroll.scrollToTop()}>
        <FontAwesomeIcon icon={faArrowCircleUp} style={{ color: "#fff" }} />
      </BackToTopButton>
      <UpperFooterTypography>Something like Unsplash</UpperFooterTypography>
      <FooterSubtextGrid item>
        <FooterLinks
          href="https://unsplash.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Unsplash
        </FooterLinks>
        <FooterLinks>Sitemap</FooterLinks>
        <FooterLinks
          href="https://auth0.com/privacy/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Auth0 Privacy Policy
        </FooterLinks>
      </FooterSubtextGrid>
      <Grid>
        <a
          href="https://github.com/Ajsalemo/Unsplash-API-Gatsby"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FontAwesomeIcon icon={faGithub} style={{ color: "#fff" }} />
        </a>
      </Grid>
    </StyledFooterGrid>
  </StyledFooter>
)

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
