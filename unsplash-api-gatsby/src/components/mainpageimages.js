// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { faHeart, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Grid } from "@material-ui/core"
import { Link } from "gatsby"
import React, { Fragment, useEffect, useState } from "react"
import "react-lazy-load-image-component/src/effects/blur.css"
import styled from "styled-components"
import { Pagination } from "../components/pagination"
import { ImagesSubGrid, LikePhotoIcon } from "../helpers/styledcomponents"
import firebase from "../utils/firebase"
import { ImageComponent } from "./imagecomponent"
import { LoadingContainer } from "./loadingcontainer"
import { StyledAvatar } from "./styledavatar"

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
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// Set the firebase collection to a variable
const db = firebase.firestore().collection("users")

const getSavedImages = (user, setCheckSavedImages) => {
  const checkSavedImagesArray = []

  db.doc(user.name)
    .get({ source: "server" })
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
}

const clickToLike = (user, src, setCheckSavedImages) => {
  // set the raw URL to a variable
  const imageSrc = src.urls.raw
  // Filter out illegal characters, in this case the "/" character and replace it with "|"
  // Firebase doesn't allow fields with illegal charcters to be updated
  const filterIllegalChars = imageSrc.replace(/\//g, "|")

  db.doc(user.name)
    .get({ source: "server" })
    .then(doc => {
      // This checks if the document exists
      if (doc.exists) {
        const imageDocument = doc.data()
        // If imageDocument is an empty object, then the below "for in" loop in the else block cannot loop through the database object from firestore, which in turn will not let any documents be added to firestore
        // This if statement tests whether or not it's empty, if it is - it will let the user be able to add documents with empty firestore data, which then in turn lets the rest of the code run
        if (
          Object.entries(imageDocument).length === 0 &&
          imageDocument.constructor === Object
        ) {
          return (
            db.doc(user.name).set(
              {
                [filterIllegalChars]: {
                  urls: {
                    raw: imageSrc,
                  },
                  user: {
                    avatar: src.user.profile_image.small,
                    href: src.user.links.html,
                    username: src.user.username || src.user,
                    name: src.user.name,
                  },
                },
              },
              // Merge a new unuiqely created field into the document
              {
                merge: true,
              }
            ),
            getSavedImages(user, setCheckSavedImages)
          )
        } else {
          // Loop through the document object from Firestore
          for (const field in imageDocument) {
            // If the image url that is being passed through this function equals one that's already saved, then delete the saved image url
            // This acts as a sort of 'toggle' between liking and not liking a photo
            if (field === filterIllegalChars) {
              return (
                db.doc(user.name).set(
                  {
                    [field]: firebase.firestore.FieldValue.delete(),
                  },
                  {
                    merge: true,
                  }
                ),
                getSavedImages(user, setCheckSavedImages)
              )
            } else {
              // Target the "users" collection in Firestore
              // Set the document to a dynamic value, in this, the user email
              // Set the field to a dynamic value, which is the image being liked by the user
              // This is so all liked images are saved under the users name
              // If the field doesn't exist, Firestore will create it
              return (
                db.doc(user.name).set(
                  {
                    [filterIllegalChars]: {
                      urls: {
                        raw: imageSrc,
                      },
                      user: {
                        avatar: src.user.profile_image.small,
                        href: src.user.links.html,
                        username: src.user.username || src.user,
                        name: src.user.name,
                      },
                    },
                  },
                  // Merge a new unuiqely created field into the document
                  {
                    merge: true,
                  }
                ),
                getSavedImages(user, setCheckSavedImages)
              )
            }
          }
        }
        // If a document doesn't exist yet then create it when a user saves their first photo
      } else {
        return (
          db.doc(user.name).set(
            {
              [filterIllegalChars]: {
                urls: {
                  raw: imageSrc,
                },
                user: {
                  avatar: src.user.profile_image.small,
                  href: src.user.links.html,
                  username: src.user.username || src.user,
                  name: src.user.name,
                },
              },
            },
            // Merge a new unuiqely created field into the document
            {
              merge: true,
            }
          ),
          getSavedImages(user, setCheckSavedImages)
        )
      }
    })
}

const deleteSavedImage = (user, src) => {
  // Filter out illegal characters, in this case the "/" character and replace it with "|"
  // Firebase doesn't allow fields with illegal charcters to be updated
  const filterCharsInUserAccount = src.urls.raw.replace(/\//g, "|")

  db
    .doc(user.name)
    .get({ source: "server" })
    .then(doc => {
      if (doc.exists) {
        const accountImages = doc.data()
        for (const likedImages in accountImages) {
          if (likedImages === filterCharsInUserAccount) {
            return (
              db.doc(user.name).set(
                {
                  [filterCharsInUserAccount]: firebase.firestore.FieldValue.delete(),
                },
                {
                  merge: true,
                }
              )
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
  chooseImagePanelView,
}) => {
  const [checkSavedImages, setCheckSavedImages] = useState(null)

  useEffect(() => {
    // Check if the user exists before reaching out to firestore to retrieve user information
    if (user.name) {
      getSavedImages(user, setCheckSavedImages)
    }
  }, [user])

  return (
    <ImagesSubGrid item lg={12}>
      <Grid
        item
        style={{ textAlign: "center", backgroundColor: "#1e172f" }}
        lg={10}
      >
        {loading || networkStatus === 4 ? (
          <LoadingContainer />
        ) : (
          images.map((src, i) => (
            <div
              style={{ display: "inline-flex", flexDirection: "column" }}
              key={i}
            >
              <ImageComponent
                alt={""}
                // Render whichever one of the image src paramters that gets passed through
                src={`${src.urls.raw}&h=330&w=330&fit=crop` || src.urls.custom}
              />
              <UserInformationGrid item>
                {/* If the person using the application is viewing the owner of the photos profile, then hide their avatar for their pictures(while on their user profile) */}
                {!chooseImagePanelView ? (
                  <Fragment>
                    {/* Pass whichever of the three props that currently exist  */}
                    <Link to="/users" state={src.user || src.user.username}>
                      <StyledAvatar
                        src={src.user.avatar || src.user.profile_image.small}
                        pageimages={1}
                      />
                    </Link>
                    <ImageCredit>
                      Photo by{" "}
                      <a
                        href={src.user.href || src.user.links.html}
                        style={{ color: "#fff" }}
                        rel="noopener noreferrer"
                      >
                        {src.user.name}
                      </a>
                    </ImageCredit>
                  </Fragment>
                ) : null}
                {/* 
                  If a user is logged in, and is not viewing their account already, display the icon to "Like" images
                  Else if there is no signed in user, do not display it
                */}
                {user.name && location !== "/account" ? (
                  <LikePhotoIcon
                    icon={faHeart}
                    onClick={() =>
                      clickToLike(
                        user,
                        src,
                        setCheckSavedImages,
                      )
                    }
                  />
                // If a user is already viewing their account, then display the 'delete' icons instead of the 'like' icons for their photos
                ) : user.name && location === "/account" ? (
                  <DeleteIcon 
                    icon={faTrashAlt}
                    onClick={() => deleteSavedImage(user, src)}
                  />
                ) : null}
              </UserInformationGrid>
            </div>
          ))
        )}
        {/* If the query returns no results, or matches either of the two listed routes, then do not display the pagination component */}
        {totalPages === 0 ||
        location === "/main" ||
        location === "/account" ? null : (
          <Pagination totalPages={totalPages} fetchMore={fetchMore} />
        )}
      </Grid>
    </ImagesSubGrid>
  )
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
