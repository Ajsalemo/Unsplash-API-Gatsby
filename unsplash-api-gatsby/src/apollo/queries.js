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
        type: "Random_Photo_Query"
        path: "photos/random?featured=true&count=30&h=330&w=330"
      ) {
      description
      id
      location @type(name: "Location") {
        __typename
        name
        city
        country
      }
      user @type(name: "Random_Photo_Query_User") {
        __typename
        id
        name
        username
        profile_image @type(name: "Random_Photo_Query_User_Profile_Image") {
          small
        }
        links @type(name: "Random_Photo_Query_User_Links") {
          __typename
          html
        }
      }
      urls @type(name: "Random_Photo_Query_User_URLS") {
        __typename
        raw
      }
    }
  }
`

export const SEARCH_IMAGES_BY_KEYWORD = gql`
  # This query takes the argument passed in by the SearchForm component and passes it to the rest directive path
  query searchImagesByKeyword {
    searchImagesByKeyword(query: $query, page: $page)
      @rest(
        type: "Search_Images_By_Keyword"
        path: "/search/photos?query={args.query}&per_page=30&page={args.page}"
      ) {
      total
      total_pages
      results @type(name: "Search_Images_By_Keyword_Results") {
        __typename
        id
        description
        user @type(name: "Search_Images_By_Keyword_User") {
          __typename
          id
          name
          username
          profile_image @type(name: "Search_Images_By_Keyword_User_Profile_Image") {
            small
          }
          links @type(name: "Search_Images_By_Keyword_User_Links") {
            __typename
            self
          }
        }
        urls @type(name: "Search_Images_By_Keyword_URLS") {
          __typename
          raw
        }
      }
    }
  }
`
export const GET_USER_PROFILE = gql`
  query getUserProfile {
    getUserProfile(username: $username)
      @rest(type: "Get_User_Profile", path: "users/{args.username}") {
      id
      username
      name
      instagram_username
      twitter_username
      portfolio_url
      bio
      location
      total_likes
      followers_count
      following_count
      downloads
      total_photos
      profile_image @type(name: "Get_User_Profile_Profile_Image") {
        large
      }
    }
  }
`
export const GET_USERS_PHOTOS = gql`
  query getUserPhotos {
    getUserPhotos(username: $username, page: $page)
      @rest(type: "Get_Users_Photo", path: "users/{args.username}/photos?page={args.page}") {
      id
      likes
      description
      user @type(name: "Get_Users_Photo_User") {
        __typename
        name
        profile_image @type(name: "Get_Users_Photo_User_Profile_Image") {
          small
        }
        links @type(name: "Get_Users_Photo_User_Links") {
          html
        }
      }
      urls @type(name: "Get_Users_Photo_URLS") {
        __typename
        raw
      }
    }
  }
`
export const GET_USERS_LIKED_PHOTOS = gql`
  query getUserLikedPhotos {
    getUserLikedPhotos(username: $username, page: $page)
      @rest(type: "Get_Users_Liked_Photos", path: "users/{args.username}/likes?page={args.page}") {
      id
      likes
      description
      user @type(name: "Get_Users_Liked_Photos_User") {
        __typename
        name
        profile_image @type(name: "Get_Users_Liked_Photos_User_Profile_Image") {
          small
        }
        links @type(name: "Get_Users_Liked_Photos_User_Link") {
          html
        }
      }
      urls @type(name: "Get_Users_Liked_Photos_URLS") {
        __typename
        raw
      }
    }
  }
`
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
