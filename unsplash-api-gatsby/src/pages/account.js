// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Footer } from "../components/footer"
import { LoadingContainer } from "../components/loadingcontainer"
import { MainNavbar } from "../components/mainnavbar"
import { MainPageImages } from "../components/mainpageimages"
import { TotalResultsHeader } from "../components/totalresultsheader"
import { StyledMainContainer } from "../helpers/styledcomponents"
import { getProfile, isAuthenticated, login } from "../utils/auth"
import firebase from "../utils/firebase"

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
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const dbUserAccount = firebase.firestore().collection("users")

const getUserAccountImages = (user, setSavedImages, setLoading) => {
  const savedImagesArray = []
  setLoading(true)
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
        setLoading(false)
        setSavedImages(savedImagesArray)
      } else {
        console.log("No document")
      }
    })
    .catch(err => console.log(err))
}

const deleteSavedImage = (user, src, setSavedImages, setLoading) => {
  // Filter out illegal characters, in this case the "/" character and replace it with "|"
  // Firebase doesn't allow fields with illegal charcters to be updated
  const filterCharsInUserAccount = src.replace(/\//g, "|")
  setLoading(true)
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
              getUserAccountImages(user, setSavedImages, setLoading),
              setLoading(false)
            )
          }
        }
      }
    })
}

const Account = ({ location }) => {
  const [savedImages, setSavedImages] = useState(null)
  const [loading, setLoading] = useState(false)
  const user = getProfile()
  useEffect(() => {
    // If an un authenticated user tries to access this route, then push them to the login page for Auth0
    if (!isAuthenticated()) {
      login()
      return <LoadingContainer />
    }
    getUserAccountImages(user, setSavedImages, setLoading)
  }, [user])

  return (
    <StyledMainContainer container>
      <MainNavbar user={getProfile()} />
      <TotalResultsHeader keyword={"Your saved images"} />
      {savedImages !== null ? (
        <MainPageImages
          loading={loading}
          images={savedImages}
          user={user}
          location={location.pathname}
        />
      ) : /* <DeleteIcon
                icon={faTrashAlt}
                onClick={() =>
                  deleteSavedImage(user, src, setSavedImages, setLoading)
                }
              /> */
      null}
      <Footer />
    </StyledMainContainer>
  )
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export default Account

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
