// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { faHeart, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import styled from "styled-components"
import { LikePhotoIcon } from "../helpers/styledcomponents"
import { CircularProgress } from "@material-ui/core"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const DeleteIcon = styled(FontAwesomeIcon)`
  color: red;
  transform: scale(1);
  transition: all 0.5s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.2);
    transition: all 0.5s ease-in-out;
  }
`
export const ActionIcons = ({
  location,
  user,
  clickToLike,
  deleteSavedImage,
  userImages,
  src,
}) => {
  let splitImagesArray

  for (let i = 0; i < userImages.length; i++) {
    // This is a pretty hacky way of seeing if a photo is already liked by a user
    // This loop creates a new array for every iteration, upon doing so it takes the value of the iteration and pushes it to the new array
    // Since each array only has one index, the if statement compares the first index value to each photo returned by the unsplash API call against the photos saved in Firebase
    // If this returns true, the icon turns red to indicate it's already liked/saved
    const newUserArray = []
    newUserArray.push(userImages[i])
    splitImagesArray = newUserArray

    if (
      splitImagesArray[0].urls.raw === src.urls.raw &&
      user.name &&
      location !== "/account"
    ) {
      return <LikePhotoIcon icon={faHeart} onClick={clickToLike} liked={1} />
    }
  }
  return (
    // If a user is logged in, and is not viewing their account already, display the icon to "Like" images
    // Else if there is no signed in user, do not display it
    user.name && location !== "/account" ? (
      <LikePhotoIcon icon={faHeart} onClick={clickToLike} liked={0} />
    ) : (
      // If a user is already viewing their account, then display the 'delete' icons instead of the 'like' icons for their photos
      <DeleteIcon icon={faTrashAlt} onClick={deleteSavedImage} />
    )
  )
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
