// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import React from "react"
import { Grid } from "@material-ui/core"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

// Total pages is the total amount of pages returned in the search result
// fetchMore is a method of Apollo Client
export const Pagination = ({ totalPages, fetchMore }) => {
  console.log(totalPages)
  // Create an empty array for the components to be pushed to
  const paginationButtonArray = []
  // Loop of the number of pages
  for (let i = 0; i < totalPages; i++) {
    paginationButtonArray.push(
      <button
        onClick={() =>
          // Looping over the page number creates a button for each iteration of page number
          // Add "+1" to the page number since it starts at a -1 based index
          fetchMore({
            variables: {
              page: i + 1,
            },
            // This method allows us to merge the newly fetched result into the original queries records
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev
              return Object.assign({}, prev, fetchMoreResult)
            },
          })
        }
      >
        {i + 1}
      </button>
    )
  }
  return <Grid>{paginationButtonArray}</Grid>
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
