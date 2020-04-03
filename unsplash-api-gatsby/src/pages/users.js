// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { useQuery } from "@apollo/react-hooks"
import { Grid, Typography } from "@material-ui/core"
import React, { useState } from "react"
import styled from "styled-components"
import { GET_USERS_PHOTOS, GET_USER_PROFILE } from "../apollo/queries"
import ErrorComponent from "../components/errorcomponent"
import { Footer } from "../components/footer"
import { LoadingContainer } from "../components/loadingcontainer"
import { MainNavbar } from "../components/mainnavbar"
import { MainPageImages } from "../components/mainpageimages"
import { PublicProfileStats } from "../components/publicprofilestats"
import { UserLikedPhotos } from "../components/userlikedphotos"
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
const ToggleTypographyGrid = styled(Grid)`
  color: #fff;
  display: flex;
  justify-content: space-around;
`
const LikeTypography = styled(Typography)`
  font-size: 1.4em;
  text-decoration: ${$props =>
    $props.chooselikepanelview ? "underline" : "none"};
  &:hover {
    cursor: pointer;
  }
`
const ImageTypography = styled(Typography)`
  font-size: 1.4em;
  text-decoration: ${$props =>
    $props.chooseimagepanelview ? "underline" : "none"};
  &:hover {
    cursor: pointer;
  }
`

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const Users = state => {
  const user = getProfile()
  const [chooseLikePanelView, setChooseLikePanelView] = useState(false)
  const [chooseImagePanelView, setChooseImagePanelView] = useState(true)

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

  if (getUserProfileError || getUserImagesError) return <ErrorComponent />
  // If the 'User profile' query is loading, or if the "getUserImagesData.getUserPhotos" propery is still empty, return the loading container until either resolve
  if (getUserProfileLoading || !getUserImagesData) return <LoadingContainer />

  // This query doesn't return a 'total pages' property
  // So to find the total pages, we do the total photos divided by the default of 10 images per page
  // Math ceiling is used to round up any floating numbers to the next whole number
  const roundTotalPhotos = totalPhoto => {
    return Math.ceil(totalPhoto / 10)
  }
  
  return (
    <StyledMainContainer container>
      <MainNavbar user={user} />
      <UsersProfileGrid item>
        <UserProfileAvatar userInfo={getUserProfileData.getUserProfile} />
        <PublicProfileStats userInfoStats={getUserProfileData.getUserProfile} />
        <ToggleTypographyGrid item>
          <ImageTypography
            variant="subtitle2"
            chooseimagepanelview={chooseImagePanelView ? 1 : 0}
            onClick={() => {
              setChooseImagePanelView(true)
              setChooseLikePanelView(false)
            }}
          >
            {getUserProfileData.getUserProfile.name}'s Photos
          </ImageTypography>
          <LikeTypography
            variant="subtitle2"
            chooselikepanelview={chooseLikePanelView ? 1 : 0}
            onClick={() => {
              setChooseLikePanelView(true)
              setChooseImagePanelView(false)
            }}
          >
            Liked Photos
          </LikeTypography>
        </ToggleTypographyGrid>
        {chooseImagePanelView ? (
          <MainPageImages
            loading={getUserImagesLoading || getUserProfileLoading}
            networkStatus={
              getUserProfileNetworkStatus || getUserImagesNetworkStatus
            }
            images={getUserImagesData.getUserPhotos}
            location={state.location.pathname}
            fetchMore={fetchMore}
            totalPages={roundTotalPhotos(
              getUserProfileData.getUserProfile.total_photos
            )}
            user={user}
            chooseImagePanelView={chooseImagePanelView}
          />
        ) : (
          <UserLikedPhotos
            username={state.location.state.username}
            location={state.location.pathname}
            user={user}
            totalPages={roundTotalPhotos(getUserProfileData.getUserProfile.total_likes)}
            chooseImagePanelView={chooseImagePanelView}
          />
        )}
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
