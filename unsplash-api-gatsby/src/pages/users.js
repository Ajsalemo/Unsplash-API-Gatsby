// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { useQuery } from "@apollo/react-hooks"
import { Grid } from "@material-ui/core"
import React from "react"
import styled from "styled-components"
import { GET_USERS_PHOTOS, GET_USER_PROFILE } from "../apollo/queries"
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
  const {
    loading: getUserProfileLoading,
    error: getUserProfileError,
    data: getUserProfileData,
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
  } = useQuery(GET_USERS_PHOTOS, {
    variables: {
      username: state.location.state.username,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  })

  if (getUserProfileError || getUserImagesError)
    return `Error: ${getUserProfileError.message}`
  if (getUserProfileLoading || getUserImagesLoading) return <LoadingContainer />

  return (
    <StyledMainContainer container>
      <MainNavbar user={getProfile()} />
      <UsersProfileGrid item>
        <UserProfileAvatar userInfo={getUserProfileData.getUserProfile} />
        <PublicProfileStats userInfoStats={getUserProfileData.getUserProfile} />
        <MainPageImages
          images={getUserImagesData.getUserPhotos}
          location={state.location.pathname}
          user={getProfile()}
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
