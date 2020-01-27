// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { AppBar, Toolbar, Typography } from "@material-ui/core"
import React from "react"
import styled from "styled-components"
import { FlexCenterGrid } from "../helpers/styledcomponents"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const generatedResultsNumber = totalResults => {
  if (totalResults > 1) {
    return `${totalResults} results`
  }
  return `${totalResults} result`
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const TotalResultsGrid = styled(FlexCenterGrid)`
  flex-direction: column;
  text-align: center;
`
const KeywordTypography = styled(Typography)`
    font-family: "Pacifico";
    padding-bottom: 0.4em;
`

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export const TotalResultsHeader = ({ keyword, totalResults }) => (
  <AppBar
    position="static"
    style={{ zIndex: "0", backgroundColor: "inherit", boxShadow: "none" }}
  >
    <Toolbar style={{ display: "flex", justifyContent: "center" }}>
      <TotalResultsGrid>
        <KeywordTypography variant="h2">{keyword}</KeywordTypography>
        <Typography variant="subtitle1">
          Your search produced {generatedResultsNumber(totalResults)}
        </Typography>
      </TotalResultsGrid>
    </Toolbar>
  </AppBar>
)

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
