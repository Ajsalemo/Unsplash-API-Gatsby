// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { useQuery } from "@apollo/react-hooks"
import { Grid } from "@material-ui/core"
import React from "react"
import styled from "styled-components"
import { GET_USERS_PHOTOS, GET_USER_PROFILE } from "../apollo/queries"
import ErrorComponent from "../components/errorcomponent"
import { Footer } from "../components/footer"
import { LoadingContainer } from "../components/loadingcontainer"
import { MainNavbar } from "../components/mainnavbar"
import { MainPageImages } from "../components/mainpageimages"
import { PublicProfileStats } from "../components/publicprofilestats"
import { UserProfileAvatar } from "../components/userprofileavatar"
import { StyledMainContainer } from "../helpers/styledcomponents"
import { getProfile } from "../utils/auth"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const UsersProfileGrid = styled(Grid)`
  background-color: #1e172f;
  width: 100%;
  text-align: center;
`

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const Users = state => {
  const user = getProfile()

  const {
    loading: getUserProfileLoading,
    error: getUserProfileError,
    data: getUserProfileData,
    networkStatus: getUserProfileNetworkStatus,
  } = useQuery(GET_USER_PROFILE, {
    variables: {
      username: state.location.state.username,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  })

  const {
    loading: getUserImagesLoading,
    error: getUserImagesError,
    data: getUserImagesData,
    networkStatus: getUserImagesNetworkStatus,
    fetchMore,
  } = useQuery(GET_USERS_PHOTOS, {
    variables: {
      username: state.location.state.username,
      // Start the query at page one - if not specified, the network request errors out
      page: 1,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  })

  if (getUserProfileError || getUserImagesError)
    return <ErrorComponent />
  // If the 'User profile' query is loading, or if the "getUserImagesData.getUserPhotos" propery is still empty, return the loading container until either resolve
  if (getUserProfileLoading || !getUserImagesData) return <LoadingContainer />

  // This query doesn't return a 'total pages' property
  // So to find the total pages, we do the total photos divided by the default of 10 images per page
  // Math ceiling is used to round up any floating numbers to the next whole number
  const roundTotalPhotos = Math.ceil(getUserProfileData.getUserProfile.total_photos / 10)
  
  return (
    <StyledMainContainer container>
      <MainNavbar user={user} />
      <UsersProfileGrid item>
        <UserProfileAvatar userInfo={getUserProfileData.getUserProfile} />
        <PublicProfileStats userInfoStats={getUserProfileData.getUserProfile} />
        <MainPageImages
          loading={getUserImagesLoading || getUserProfileLoading}
          networkStatus={getUserProfileNetworkStatus || getUserImagesNetworkStatus}
          images={getUserImagesData.getUserPhotos}
          location={state.location.pathname}
          fetchMore={fetchMore}
          totalPages={roundTotalPhotos}
          user={user}
        />
      </UsersProfileGrid>
      <Footer />
    </StyledMainContainer>
  )
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export default Users

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
