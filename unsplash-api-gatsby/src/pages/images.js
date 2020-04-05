// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { useQuery } from "@apollo/react-hooks"
import { Grid } from "@material-ui/core"
import React from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import styled from "styled-components"
import { GET_SPECIFIED_PHOTO } from "../apollo/queries"
import ErrorComponent from "../components/errorcomponent"
import { Footer } from "../components/footer"
import { LoadingContainer } from "../components/loadingcontainer"
import { MainNavbar } from "../components/mainnavbar"
import { StyledMainContainer } from "../helpers/styledcomponents"
import placeholder from "../images/placeholder.jpg"
import { getProfile } from "../utils/auth"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const SingleLoadedImageGrid = styled(Grid)`
  height: auto;
  width: 100%;
  background-color: #1e172f;
  padding-bottom: 2em;
  text-align: center;
`
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const Images = state => {
  const user = getProfile()

  const { loading, error, data } = useQuery(GET_SPECIFIED_PHOTO, {
    variables: {
      id: state.location.state.id,
    },
    fetchPolicy: "cache-and-network",
  })

  if (loading) return <LoadingContainer />
  if (error) return <ErrorComponent />
  
  return (
    <StyledMainContainer container>
      <MainNavbar user={user} />
      <SingleLoadedImageGrid item>
        <LazyLoadImage
          src={data.getSpecifiedPhoto.urls.regular}
          effect="blur"
          placeholderSrc={placeholder}
        />
      </SingleLoadedImageGrid>
      <Footer />
    </StyledMainContainer>
  )
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export default Images

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
