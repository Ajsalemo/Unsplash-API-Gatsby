// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { useQuery } from "@apollo/react-hooks"
import { Grid } from "@material-ui/core"
import React, { useEffect } from "react"
import styled from "styled-components"
import { RANDOM_IMAGE_SEARCH } from "../apollo/queries"
import { LoadingContainer } from "../components/loadingcontainer"
import { MainNavbar } from "../components/mainnavbar"
import { MainPageImages } from "../components/mainpageimages"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const StyledMainContainer = styled(Grid)`
  display: flex;
  justify-content: center;
  background-color: #1e172f;
  height: 100vh;
  padding-top: 5em;
`

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const Main = () => {
  const { loading, error, data } = useQuery(RANDOM_IMAGE_SEARCH)
  if (error) return `Error: ${error.message}`
  if (loading) return <LoadingContainer />
  return (
    <StyledMainContainer container>
      <MainNavbar />
      <MainPageImages randomImages={data.randomImage} />
    </StyledMainContainer>
  )
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export default Main

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //