// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { CircularProgress } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { Footer } from "../components/footer"
import { LoadingContainer } from "../components/loadingcontainer"
import { MainNavbar } from "../components/mainnavbar"
import { MainPageImages } from "../components/mainpageimages"
import { NoImages } from "../components/noimages"
import { TotalResultsHeader } from "../components/totalresultsheader"
import { StyledMainContainer } from "../helpers/styledcomponents"
import { getProfile, isAuthenticated, login } from "../utils/auth"
import firebase from "../utils/firebase"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const dbUserAccount = firebase.firestore().collection("users")

const getUserAccountImages = (user, setSavedImages, setLoading) => {
  setLoading(true)
  dbUserAccount
    .doc(user.name)
    .onSnapshot(snap => {
        const savedImagesArray = []
        const documentResult = snap.data()
        for (const property in documentResult) {
            savedImagesArray.push(documentResult[property])
        }
        setLoading(false)
        setSavedImages(savedImagesArray)
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
      <MainNavbar user={user} />
      <TotalResultsHeader keyword={"Your saved images"} />
      {savedImages !== null ? (
        <>
          <MainPageImages
            loading={loading}
            images={savedImages}
            user={user}
            location={location.pathname}
          />
          {/* If there are no saved images for the user on their account, render this component */}
          <NoImages savedImages={savedImages} />
        </>
      ) : (
        // While we're waiting for a response to be returned from firebase, show a loading indicator
        <CircularProgress style={{ color: "#fff" }} />
      )}
      <Footer />
    </StyledMainContainer>
  )
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export default Account

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //