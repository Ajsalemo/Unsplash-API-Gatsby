// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { useQuery } from "@apollo/react-hooks"
import React from "react"
import { SEARCH_IMAGES_BY_KEYWORD } from "../apollo/queries"
import { Footer } from "../components/footer"
import { LoadingContainer } from "../components/loadingcontainer"
import { MainNavbar } from "../components/mainnavbar"
import { MainPageImages } from "../components/mainpageimages"
import { TotalResultsHeader } from "../components/totalresultsheader"
import { StyledMainContainer } from "../helpers/styledcomponents"
import { getProfile } from "../utils/auth"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const ImageResults = state => {
  const user = getProfile()

  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    SEARCH_IMAGES_BY_KEYWORD,
    {
      variables: {
        query: state.location.state.search,
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "cache-and-network",
    }
  )

  if (loading) return <LoadingContainer />

  return (
    <StyledMainContainer container>
      <MainNavbar user={user} />
      <TotalResultsHeader
        keyword={state.location.state.search}
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
  )
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export default ImageResults

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
