// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { Typography } from "@material-ui/core"
import React, { useState } from "react"
import styled from "styled-components"
import { FlexCenterGrid } from "../helpers/styledcomponents"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const PaginatedButton = styled.button`
  background-color: ${props => (props.selectedpage ? "red" : "transparent")};
  border: ${props => (props.selectedpage ? "2px solid #fff" : "none")};
  color: #fff;
  &:hover {
    cursor: pointer;
    background-color: red;
  }
`

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const fetchMoreResults = (page, fetchMore) => {
  // Request the specified page number from the GraphQL Query
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
  console.log(currentPage)
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
      {/* This button brings the user to the first page in the returned results */}
      {totalPages === 1 ? null : (
        <PaginatedButton
          onClick={() => {
            getCurrentPage(1)
            fetchMoreResults(1, fetchMore)
          }}
        >
          <FontAwesomeIcon icon={faAngleDoubleLeft} style={{ color: "#fff" }} />
        </PaginatedButton>
      )}
      {paginationButtonArray.map((page, i) =>
        // If ellipsis is showing, do not make it clickable(for now)
        page === "..." ? (
          <span style={{ color: "#fff", alignSelf: "center" }} key={"page-span"}>{page}</span>
        ) : (
          // Display the normal numbered pages
          <PaginatedButton
            onClick={() => {
              getCurrentPage(page)
              fetchMoreResults(page, fetchMore)
            }}
            selectedpage={currentPage === page ? 1 : 0}
            key={i}
          >
            <Typography variant="subtitle2">{page}</Typography>
          </PaginatedButton>
        )
      )}
      {/* This button brings the user to the last page in the returned results */}
      {totalPages === 1 ? null : (
        <PaginatedButton
          onClick={() => {
            getCurrentPage(totalPages)
            fetchMoreResults(totalPages, fetchMore)
          }}
        >
          <FontAwesomeIcon
            icon={faAngleDoubleRight}
            style={{ color: "#fff" }}
          />
        </PaginatedButton>
      )}
    </FlexCenterGrid>
  )
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
