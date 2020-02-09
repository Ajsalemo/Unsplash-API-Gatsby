// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import React from "react"
import { Grid, Typography } from "@material-ui/core"
import styled from "styled-components"
import { FlexCenterGrid } from "../helpers/styledcomponents"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export const Footer = () => (
  <StyledFooter container>
    <StyledFooterGrid item xs={8} sm={6} md={5} lg={3}>
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
        <FooterLinks>
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
