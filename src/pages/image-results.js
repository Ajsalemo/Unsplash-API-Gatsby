// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { useQuery } from "@apollo/react-hooks"
import React from "react"
import { SEARCH_IMAGES_BY_KEYWORD } from "../apollo/queries"
import ErrorComponent from "../components/errorcomponent"
import { Footer } from "../components/footer"
import { LoadingContainer } from "../components/loadingcontainer"
import { MainNavbar } from "../components/mainnavbar"
import { MainPageImages } from "../components/mainpageimages"
import { MobileHomeNav } from "../components/mobilehomenav"
import { SEO } from "../components/SEO"
import { TotalResultsHeader } from "../components/totalresultsheader"
import { StyledMainContainer } from "../helpers/styledcomponents"
import { getProfile } from "../utils/auth"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const ImageResults = state => {
  const user = getProfile()
  const searchQuery =
    state.location.state !== null ? state.location.state.search : "new york"

  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    SEARCH_IMAGES_BY_KEYWORD,
    {
      variables: {
        query: searchQuery,
      },
      notifyOnNetworkStatusChange: true,
    }
  )

  if (!data) return <LoadingContainer />
  if (error) return <ErrorComponent />

  return (
    <>
      <SEO
        title="Something like Unsplash"
        description="A site to experiment with Unsplash's API"
        pathname="/image-results"
      />
      <StyledMainContainer container>
        <MainNavbar user={user} />
        <MobileHomeNav />
        <TotalResultsHeader
          keyword={searchQuery}
          totalResults={data.searchImagesByKeyword.total}
        />
        <MainPageImages
          error={error}
          loading={loading}
          networkStatus={networkStatus}
          images={data.searchImagesByKeyword.results}
          totalPages={data.searchImagesByKeyword.total_pages}
          fetchMore={fetchMore}
          user={user}
        />
        <Footer />
      </StyledMainContainer>
    </>
  )
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export default ImageResults

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
