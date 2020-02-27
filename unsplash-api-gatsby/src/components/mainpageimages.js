// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Grid } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import "react-lazy-load-image-component/src/effects/blur.css"
import styled from "styled-components"
import { Pagination } from "../components/pagination"
import {
  ImagesSubGrid,
  StyledAvatar,
  StyledLazyLoadedImage,
} from "../helpers/styledcomponents"
import firebase from "../utils/firebase"
import { LoadingContainer } from "./loadingcontainer"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const ImageCredit = styled.span`
  color: #fff;
  margin-top: -0.5em;
  padding-left: 1em;
  font-size: 0.8em;
`
const UserInformationGrid = styled(Grid)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding-bottom: 3.5em;
`
const LikePhotoIcon = styled(FontAwesomeIcon)`
  color: ${props => (props.unlikephoto ? "red" : "white")};
  transition: all 0.5s ease-in-out;
  transform: scale(1);
  &:hover {
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    transform: ${props => (props.unlikephoto ? "scale(1)" : "scale(1.3)")};
  }
`

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const clickToLike = (user, src) => {
  // set the raw URL to a variable
  const imageSrc = src.urls.raw
  const filterIllegalChars = imageSrc.replace(/\//g, "|")
  const firebaseData = firebase
    .firestore()
    .collection("users")
    .doc(user.name)

  firebaseData.get().then(doc => {
    if (doc.exists) {
      const imageDocument = doc.data()
      for (const field in imageDocument) {
        if (field === filterIllegalChars) {
          console.log(`${filterIllegalChars}: ${field}`)
          console.log(true)
          firebaseData.update({
            [field]: firebase.firestore.FieldValue.delete(), 
          })
        } else {
          // Target the "users" collection in Firestore
          // Set the document to a dynamic value, in this, the user email
          // Set the field to a dynamic value, which is the image being liked by the user
          // This is so all liked images are saved under the users name
          // If the field doesn't exist, Firestore will create it
          firebaseData.set(
            {
              [filterIllegalChars]: imageSrc,
            },
            // Merge a new unuiqely created field into the document
            {
              merge: true,
            }
          )
        }
      }
    }
  })
}

export const MainPageImages = ({
  images,
  totalPages,
  fetchMore,
  loading,
  networkStatus,
  location,
  user,
}) => {
  const [checkSavedImages, setCheckSavedImages] = useState(null)

  useEffect(() => {
    const db = firebase
      .firestore()
      .collection("users")
      .doc(user.name)
    const checkSavedImagesArray = []
    db.get()
      .then(doc => {
        if (doc.exists) {
          const accountDocumentResult = doc.data()
          // If the document exists, loop through the properties within the object
          for (const property in accountDocumentResult) {
            // This pushes the custom component into the empty checkSavedImagesArray, this also sets the 'src' attribute of the image component to the properties within the firestore document
            checkSavedImagesArray.push(accountDocumentResult[property])
          }
          // Invoke the state setting function to set "checkSavedImages" state to the checkSavedImagesArray
          setCheckSavedImages(checkSavedImagesArray)
        } else {
          console.log("No document")
        }
      })
      .catch(err => console.log(err))
  }, [user.name])

  return (
    <ImagesSubGrid item lg={12}>
      <Grid
        item
        style={{ textAlign: "center", backgroundColor: "#1e172f" }}
        lg={10}
      >
        {loading || networkStatus === 4 || checkSavedImages === null ? (
          <LoadingContainer />
        ) : (
          images.map((src, i) => (
            <div
              style={{ display: "inline-flex", flexDirection: "column" }}
              key={src.id}
            >
              <StyledLazyLoadedImage
                alt={""}
                // Render whichever one of the image src paramters that gets passed through
                src={src.urls.custom || `${src.urls.raw}&h=330&w=330&fit=crop`}
                effect="blur"
              />
              <UserInformationGrid item>
                <StyledAvatar
                  src={src.user.profile_image.small}
                  pageimages={1}
                />
                <ImageCredit>
                  Photo by{" "}
                  <a
                    href={src.user.links.html}
                    style={{ color: "#fff" }}
                    rel="noopener noreferrer"
                  >
                    {src.user.name}
                  </a>
                </ImageCredit>
                {/* 
                  If a user is logged in, display the icon to "Like" images
                  Else if there is no signed in user, do not display it
                */}
                {user.name
                  ? // TO-DO
                    // Abstract this into its own component
                    // These conditionals will ideally check whether or not an image was saved by the user already
                    // If they have been then display a different color icon and invoke a 'unlike' function on-click
                    checkSavedImages.length
                    ? checkSavedImages.map(savedImage =>
                        savedImage === src.urls.raw ? (
                          <LikePhotoIcon unlikephoto={1} icon={faHeart} />
                        ) : null
                      )
                    : null
                  : null}
                <LikePhotoIcon
                  icon={faHeart}
                  onClick={() => clickToLike(user, src)}
                />
              </UserInformationGrid>
            </div>
          ))
        )}
        {/* If the query returns no results then do not display the pagination component */}
        {totalPages === 0 || location === "/main" ? null : (
          <Pagination totalPages={totalPages} fetchMore={fetchMore} />
        )}
      </Grid>
    </ImagesSubGrid>
  )
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
