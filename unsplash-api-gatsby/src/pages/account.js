// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { Grid } from "@material-ui/core"
import React, { Fragment, useEffect, useState } from "react"
import { Footer } from "../components/footer"
import { LoadingContainer } from "../components/loadingcontainer"
import { MainNavbar } from "../components/mainnavbar"
import { TotalResultsHeader } from "../components/totalresultsheader"
import {
  ImagesSubGrid,
  StyledLazyLoadedImage,
  StyledMainContainer,
} from "../helpers/styledcomponents"
import { getProfile, isAuthenticated, login } from "../utils/auth"
import firebase from "../utils/firebase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"

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
const UserAccountImagesGrid = styled(Grid)`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1em;
`

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const dbUserAccount = firebase.firestore().collection("users")

const getUserAccountImages = (user, setSavedImages) => {
  const savedImagesArray = []

  dbUserAccount
    .doc(user.name)
    .get()
    .then(doc => {
      if (doc.exists) {
        const documentResult = doc.data()
        // If the document exists, loop through the properties within the object
        for (const property in documentResult) {
          // This pushes the custom component into the empty savedImagesArray, this also sets the 'src' attribute of the image component to the properties within the firestore document
          savedImagesArray.push(documentResult[property])
        }
        // Invoke the state setting function to set "savedImages" state to the savedImagesArray
        setSavedImages(savedImagesArray)
      } else {
        console.log("No document")
      }
    })
    .catch(err => console.log(err))
}

const deleteSavedImage = (user, src, setSavedImages) => {
  // Filter out illegal characters, in this case the "/" character and replace it with "|"
  // Firebase doesn't allow fields with illegal charcters to be updated
  const filterCharsInUserAccount = src.replace(/\//g, "|")

  dbUserAccount
    .doc(user.name)
    .get({ source: "server" })
    .then(doc => {
      if (doc.exists) {
        const accountImages = doc.data()
        for (const likedImages in accountImages) {
          if (likedImages === filterCharsInUserAccount) {
            return (
              dbUserAccount.doc(user.name).set(
                {
                  [filterCharsInUserAccount]: firebase.firestore.FieldValue.delete(),
                },
                {
                  merge: true,
                }
              ),
              getUserAccountImages(user, setSavedImages)
            )
          }
        }
      }
    })
}

const Account = () => {
  const [savedImages, setSavedImages] = useState(null)
  const user = getProfile()

  useEffect(() => {
    // If an un authenticated user tries to access this route, then push them to the login page for Auth0
    if (!isAuthenticated()) {
      login()
      return <LoadingContainer />
    }
    getUserAccountImages(user, setSavedImages)
  }, [user])

  return (
    <Fragment>
      <StyledMainContainer container>
        <MainNavbar user={getProfile()} />
        <TotalResultsHeader keyword={"Your saved images"} />
        <ImagesSubGrid item lg={12}>
          <Grid
            item
            style={{ textAlign: "center", paddingBottom: "3.5em" }}
            lg={10}
          >
            {savedImages !== null
              ? savedImages.map(src => (
                  <UserAccountImagesGrid item>
                    <StyledLazyLoadedImage
                      src={`${src}&h=330&w=330&fit=crop`}
                    />
                    <DeleteIcon icon={faTrashAlt} onClick={() => deleteSavedImage(user, src, setSavedImages)} />
                  </UserAccountImagesGrid>
                ))
              : null}
          </Grid>
        </ImagesSubGrid>
        <Footer />
      </StyledMainContainer>
    </Fragment>
  )
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export default Account

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
