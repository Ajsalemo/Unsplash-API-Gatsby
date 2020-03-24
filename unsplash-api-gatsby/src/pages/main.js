// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { useQuery } from "@apollo/react-hooks"
import React from "react"
import { RANDOM_PHOTO_QUERY } from "../apollo/queries"
import ErrorComponent from "../components/errorcomponent"
import { Footer } from "../components/footer"
import { LoadingContainer } from "../components/loadingcontainer"
import { MainNavbar } from "../components/mainnavbar"
import { MainPageImages } from "../components/mainpageimages"
import { StyledMainContainer } from "../helpers/styledcomponents"
import { getProfile } from "../utils/auth"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const Main = state => {
  const user = getProfile()

  const { loading, error, data } = useQuery(RANDOM_PHOTO_QUERY)
  if (error) return <ErrorComponent />
  if (loading) return <LoadingContainer />
  return (
    <>
      <StyledMainContainer container>
        <MainNavbar user={user} />
        <MainPageImages
          images={data.randomPhotoQuery}
          location={state.location.pathname}
          user={user}
        />
        <Footer />
      </StyledMainContainer>
    </>
  )
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export default Main

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
