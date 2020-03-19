// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { useQuery } from "@apollo/react-hooks"
import React from "react"
import { SEARCH_IMAGES_BY_KEYWORD } from "../apollo/queries"
import ErrorComponent from "../components/errorcomponent"
import { Footer } from "../components/footer"
import { MainNavbar } from "../components/mainnavbar"
import { MainPageImages } from "../components/mainpageimages"
import { TotalResultsHeader } from "../components/totalresultsheader"
import { StyledMainContainer } from "../helpers/styledcomponents"
import { getProfile } from "../utils/auth"
import { LoadingContainer } from "../components/loadingcontainer"

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
  if (error) return <ErrorComponent />
  if (loading) return <LoadingContainer />
  return (
    <StyledMainContainer container>
      <MainNavbar user={user} />
      <TotalResultsHeader
        keyword={state.location.state.search}
        totalResults={data.searchImagesByKeyword.total}
      />
      <MainPageImages
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
