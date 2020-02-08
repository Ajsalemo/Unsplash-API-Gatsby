// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { useQuery } from "@apollo/react-hooks"
import React from "react"
import { SEARCH_IMAGES_BY_KEYWORD } from "../apollo/queries"
import { MainNavbar } from "../components/mainnavbar"
import { MainPageImages } from "../components/mainpageimages"
import { TotalResultsHeader } from "../components/totalresultsheader"
import { StyledMainContainer } from "../helpers/styledcomponents"
import { getProfile } from "../utils/auth"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const ImageResults = state => {
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
  if (error) return `Error: ${error.message}`
  return (
    <StyledMainContainer container>
      <MainNavbar user={getProfile()} />
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
      />
    </StyledMainContainer>
  )
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export default ImageResults

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
