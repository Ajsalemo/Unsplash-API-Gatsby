// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { CircularProgress, Typography } from "@material-ui/core"
import React from "react"
import styled from "styled-components"
import { FlexCenterGrid } from "../helpers/styledcomponents"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const LoadingContainerGrid = styled(FlexCenterGrid)`
  height: 100vh;
  background-color: #1e172f;
  align-items: center;
`

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export const LoadingContainer = () => (
  <LoadingContainerGrid>
    <Typography style={{ color: "#fff", paddingRight: "0.3em" }}>
      Loading...
    </Typography>
    <CircularProgress style={{ color: "#fff" }} />
  </LoadingContainerGrid>
)

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
