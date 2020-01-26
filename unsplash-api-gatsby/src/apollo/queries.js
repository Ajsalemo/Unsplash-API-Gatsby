// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import gql from "graphql-tag"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export const RANDOM_PHOTO_QUERY = gql`
  query randomPhotoQuery {
    # Sets the random photo query to a count of 30 returned images, only featured photos, and width/height of 400px
    randomPhotoQuery
      @rest(
        type: "Random Photo Query"
        path: "photos/random?featured=true&count=30&h=330&w=330"
      ) {
      description
      id
      location @type(name: "location") {
        __typename
        name
        city
        country
      }
      urls @type(name: "urls") {
        custom
      }
    }
  }
`

export const SEARCH_IMAGES_BY_KEYWORD = gql`
  # This query takes the argument passed in by the SearchForm component and passes it to the rest directive path
  query searchImagesByKeyword {
    searchImagesByKeyword(query: $query)
      @rest(
        type: "Search Photos By Keyword"
        path: "/search/photos?query={args.query}&per_page=30"
      ) {
      total
      total_pages
      results @type(name: "results") {
        __typename
        description
        urls @type(name: "search urls") {
          __typename
          raw
        }
      }
    }
  }
`
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
