// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { Typography } from "@material-ui/core"
import React, { useState } from "react"
import styled from "styled-components"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const PaginatedButton = styled.button`
  background-color: transparent;
  border: none;
  color: #fff;
  &:hover {
    cursor: pointer;
    background-color: red;
  }
`

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const fetchMoreResults = (page, fetchMore) => {
  fetchMore({
    variables: {
      page: page + 1,
    },
    // This method allows us to merge the newly fetched result into the original queries records
    updateQuery: (prev, { fetchMoreResult }) => {
      if (!fetchMoreResult) return prev
      return Object.assign({}, prev, fetchMoreResult)
    },
  })
}

// Total pages is the total amount of pages returned in the search result
// fetchMore is a method of Apollo Client
export const Pagination = ({ totalPages, fetchMore }) => {
  const [currentPage, getCurrentPage] = useState(0)
  const paginationButtonArray = []
  // Looping over the page number creates a button for each iteration of page number
  // Add "+1" to the page number since it starts at a -1 based index
  for (let i = 0; i < totalPages; i++) {
    paginationButtonArray.push(i)
  }
  console.log(currentPage)
  return paginationButtonArray.map(page => (
    <PaginatedButton onClick={() => { getCurrentPage(page + 1); fetchMoreResults(page, fetchMore) }}>
      <Typography variant="subtitle2">{page + 1}</Typography>
    </PaginatedButton>
  ))
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
