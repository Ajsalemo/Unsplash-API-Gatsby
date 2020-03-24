// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { faHeart, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import styled from "styled-components"
import { LikePhotoIcon } from "../helpers/styledcomponents"

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
  src,
  setCheckSavedImages,
  clickToLike,
  deleteSavedImage,
}) =>
  // If a user is logged in, and is not viewing their account already, display the icon to "Like" images
  // Else if there is no signed in user, do not display it
  user.name && location !== "/account" ? (
    <LikePhotoIcon icon={faHeart} onClick={clickToLike} />
  ) : // If a user is already viewing their account, then display the 'delete' icons instead of the 'like' icons for their photos
  user.name && location === "/account" ? (
    <DeleteIcon icon={faTrashAlt} onClick={deleteSavedImage} />
  ) : null

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
