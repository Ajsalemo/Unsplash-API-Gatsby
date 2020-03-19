// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { useQuery } from "@apollo/react-hooks"
import React from "react"
import { GET_USERS_LIKED_PHOTOS } from "../apollo/queries"
import ErrorComponent from "../components/errorcomponent"
import { LoadingContainer } from "../components/loadingcontainer"
import { MainPageImages } from "../components/mainpageimages"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export const UserLikedPhotos = ({
  username,
  location,
  user,
  totalPages,
  chooseImagePanelView,
}) => {
  const { loading, error, data, networkStatus, fetchMore } = useQuery(
    GET_USERS_LIKED_PHOTOS,
    {
      variables: {
        username: username,
        // Start the query at page one - if not specified, the network request errors out
        page: 1,
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "cache-and-network",
    }
  )

  if (loading) return <LoadingContainer />
  if (error) return <ErrorComponent />
  console.log(data.getUserLikedPhotos)
  return (
    <MainPageImages
      loading={loading}
      networkStatus={networkStatus}
      images={data.getUserLikedPhotos}
      username={username}
      location={location}
      fetchMore={fetchMore}
      totalPages={totalPages}
      user={user}
      chooseImagePanelView={chooseImagePanelView}
    />
  )
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
