// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { useQuery } from "@apollo/react-hooks"
import React, { Fragment } from "react"
import { RANDOM_PHOTO_QUERY } from "../apollo/queries"
import { Footer } from "../components/footer"
import { LoadingContainer } from "../components/loadingcontainer"
import { MainNavbar } from "../components/mainnavbar"
import { MainPageImages } from "../components/mainpageimages"
import { StyledMainContainer } from "../helpers/styledcomponents"
import { getProfile } from "../utils/auth"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const Main = state => {
  const { loading, error, data } = useQuery(RANDOM_PHOTO_QUERY)
  if (error) return `Error: ${error.message}`
  if (loading) return <LoadingContainer />
  return (
    <Fragment>
      <StyledMainContainer container>
        <MainNavbar user={getProfile()} />
        <MainPageImages
          images={data.randomPhotoQuery}
          location={state.location.pathname}
          user={getProfile()}
        />
        <Footer />
      </StyledMainContainer>
    </Fragment>
  )
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export default Main

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
