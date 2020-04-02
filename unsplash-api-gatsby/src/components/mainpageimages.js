// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { Grid } from "@material-ui/core"
import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import "react-lazy-load-image-component/src/effects/blur.css"
import styled from "styled-components"
import { Pagination } from "../components/pagination"
import { ImagesSubGrid } from "../helpers/styledcomponents"
import firebase from "../utils/firebase"
import { ActionIcons } from "./actionicons"
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
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

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
  // Set the firebase collection to a variable
  const db = firebase.firestore().collection("users")
  const [userImages, setUserImages] = useState([])
  console.log(images)
  const retrieveUserSavedImages = user => {
    const savedImagesArray = []
    if (user.name) {
      db.doc(user.name)
        .get()
        .then(doc => {
          if (doc.exists) {
            const documentResult = doc.data()
            // If the document exists, loop through the properties within the object
            for (const property in documentResult) {
              // This pushes the custom component into the empty savedImagesArray, this also sets the 'src' attribute of the image component to the properties within the firestore document
              savedImagesArray.push(documentResult[property])
            }
            setUserImages(savedImagesArray)
          } else {
            console.log("No document")
          }
        })
        .catch(err => console.log(err))
    }
  }

  const clickToLike = (user, src) => {
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
              retrieveUserSavedImages(user),
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
              )
            )
          } else {
            // Target the "users" collection in Firestore
            // Set the document to a dynamic value, in this, the user email
            // Set the field to a dynamic value, which is the image being liked by the user
            // This is so all liked images are saved under the users name
            // If the field doesn't exist, Firestore will create it
            return (
              retrieveUserSavedImages(user),
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
              )
            )
          }
          // If a document doesn't exist yet then create it when a user saves their first photo
        } else {
          return (
            retrieveUserSavedImages(user),
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
            )
          )
        }
      })
  }

  const deleteSavedImage = (user, src) => {
    // Filter out illegal characters, in this case the "/" character and replace it with "|"
    // Firebase doesn't allow fields with illegal charcters to be updated
    const filterCharsInUserAccount = src.urls.raw.replace(/\//g, "|")

    db.doc(user.name)
      .get({ source: "server" })
      .then(doc => {
        if (doc.exists) {
          const accountImages = doc.data()
          for (const likedImages in accountImages) {
            if (likedImages === filterCharsInUserAccount) {
              return (
                retrieveUserSavedImages(user),
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

  useEffect(() => {
    retrieveUserSavedImages(user)
  }, [])
  console.log(images)
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
                  <>
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
                  </>
                ) : null}
                <ActionIcons
                  location={location}
                  user={user}
                  src={src}
                  userImages={userImages}
                  clickToLike={() => clickToLike(user, src)}
                  deleteSavedImage={() => deleteSavedImage(user, src)}
                />
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
