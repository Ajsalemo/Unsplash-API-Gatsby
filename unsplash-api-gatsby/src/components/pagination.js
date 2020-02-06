// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { Typography, Grid } from "@material-ui/core"
import React, { useState } from "react"
import styled from "styled-components"
import { FlexCenterGrid } from "../helpers/styledcomponents"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const PaginatedButton = styled.button`
  background-color: ${props => (props.selectedpage ? "red" : "transparent")};
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
      page: page,
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
  const delta = 3
  // Empty array to house the total amount of pages
  const paginationButtonArray = []
  // Pagination algorithm
  for (
    let i = Math.max(2, currentPage - delta);
    i <= Math.min(totalPages - 1, currentPage + delta);
    i += 1
  ) {
    paginationButtonArray.push(i)
  }

  if (currentPage - delta > 2) {
    paginationButtonArray.unshift("...")
  }
  if (currentPage + delta < totalPages - 1) {
    paginationButtonArray.push("...")
  }

  paginationButtonArray.unshift(1)
  if (totalPages !== 1) paginationButtonArray.push(totalPages)
  return (
    <FlexCenterGrid item style={{ flexDirection: "row" }}>
      {paginationButtonArray.map(page => (
        <PaginatedButton
          onClick={() => {
            getCurrentPage(page)
            fetchMoreResults(page, fetchMore)
          }}
          selectedpage={currentPage === page ? 1 : 0}
        >
          <Typography variant="subtitle2">{page}</Typography>
        </PaginatedButton>
      ))}
    </FlexCenterGrid>
  )
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
