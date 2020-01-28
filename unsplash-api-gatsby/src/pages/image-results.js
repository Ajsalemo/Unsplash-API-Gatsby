// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { useQuery } from "@apollo/react-hooks"
import React from "react"
import { SEARCH_IMAGES_BY_KEYWORD } from "../apollo/queries"
import { LoadingContainer } from "../components/loadingcontainer"
import { MainNavbar } from "../components/mainnavbar"
import { MainPageImages } from "../components/mainpageimages"
import { TotalResultsHeader } from "../components/totalresultsheader"
import { StyledMainContainer } from "../helpers/styledcomponents"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const ImageResults = state => {
  const { loading, error, data } = useQuery(SEARCH_IMAGES_BY_KEYWORD, {
    variables: {
      query: state.location.state.search,
    },
  })
  if (error) return `Error: ${error.message}`
  if (loading) return <LoadingContainer />
  console.log(data);
  return (
    <StyledMainContainer container>
      <MainNavbar />
      <TotalResultsHeader
        keyword={state.location.state.search}
        totalResults={data.searchImagesByKeyword.total}
      />
      <MainPageImages images={data.searchImagesByKeyword.results} />
    </StyledMainContainer>
  )
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export default ImageResults

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
