// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import React, { useEffect } from "react"
import { Footer } from "../components/footer"
import { LoadingContainer } from "../components/loadingcontainer"
import { MainNavbar } from "../components/mainnavbar"
import { MainPageImages } from "../components/mainpageimages"
import { TotalResultsHeader } from "../components/totalresultsheader"
import { StyledMainContainer } from "../helpers/styledcomponents"
import { getProfile, isAuthenticated, login } from "../utils/auth"
import { SEO } from "../components/SEO"
import { MobileHomeNav } from "../components/mobilehomenav"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const Account = ({ location }) => {
  const user = getProfile()

  useEffect(() => {
    // If an un authenticated user tries to access this route, then push them to the login page for Auth0
    if (!isAuthenticated()) {
      login()
      return <LoadingContainer />
    }
  }, [])

  return (
    <>
      <SEO
        title="Something like Unsplash"
        description="A site to experiment with Unsplash's API"
        pathname="/account"
      />
      <StyledMainContainer container>
        <MainNavbar user={user} />
        <MobileHomeNav />
        <TotalResultsHeader keyword={"Your saved images"} />
        <MainPageImages user={user} location={location.pathname} />
        <Footer />
      </StyledMainContainer>
    </>
  )
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export default Account

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
