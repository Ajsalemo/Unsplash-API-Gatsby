// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import styled from "styled-components"
import firebase from "../utils/firebase"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const LikePhotoIcon = styled(FontAwesomeIcon)`
  color: ${props => (props.unlikephoto ? "red" : "white")};
  transition: all 0.5s ease-in-out;
  transform: scale(1);
  &:hover {
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    transform: scale(1.3);
  }
`
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const clickToLike = (user, src) => {
  // set the raw URL to a variable
  const imageSrc = src.urls.raw
  firebase
    .firestore()
    // Target the "users" collection in Firestore
    .collection("users")
    // Set the document to a dynamic value, in this, the user email
    .doc(user.name)
    // Set the field to a dynamic value, which is the image being liked by the user
    // This is so all liked images are saved under the users name
    // If the field doesn't exist, Firestore will create it
    .set(
      {
        [imageSrc]: src.urls.raw,
      },
      // Merge a new unuiqely created field into the document
      {
        merge: true,
      }
    )
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export const ChoosePhoto = ({ checkSavedImages, src, user }) => (
    checkSavedImages.length ? (
        checkSavedImages.map(savedImage => (
            savedImage === src.urls.raw ? (
                <LikePhotoIcon icon={faHeart} unlikephoto={1} />
            ) : (
                <LikePhotoIcon icon={faHeart} onClick={() => clickToLike(user, src)} />
            )
        ))
    ) : null
)

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
