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
    height: 10em;
    background-color: #1e172f;
    border-top: 1px solid #fff;
`
const StyledFooterGrid = styled(Grid)`
    display: flex;
    flex-direction: column;
    text-align: center;
    ustify-content: space-evenly;
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

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export const Footer = () => (
    <StyledFooter container>
        <StyledFooterGrid item lg={3}>
            <UpperFooterTypography>Something like Unsplash</UpperFooterTypography>
            <FooterSubtextGrid item>
                <Typography style={{ fontSize: "0.8em" }}>Unsplash</Typography>
                <Typography style={{ fontSize: "0.8em" }}>Sitemap</Typography>
                <Typography style={{ fontSize: "0.8em" }}>Auth0 Privacy Policy</Typography>
            </FooterSubtextGrid>
            <Grid>
                <FontAwesomeIcon icon={faGithub} style={{ color: "#fff" }} />
            </Grid>
        </StyledFooterGrid>
    </StyledFooter>
)

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
