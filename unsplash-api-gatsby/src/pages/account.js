// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import React, { Fragment, useEffect, useState } from "react"
import { StyledMainContainer, StyledLazyLoadedImage } from "../helpers/styledcomponents"
import { getProfile, isAuthenticated, login } from "../utils/auth"
import firebase from "../utils/firebase"
import { Grid } from "@material-ui/core"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const Account = () => {
  const [savedImages, setSavedImages] = useState(null)
  
  useEffect(() => {
    // If an un authenticated user tries to access this route, then push them to the login page for Auth0
    if (!isAuthenticated()) {
      login()
      return <p>Redirecting to login...</p>
    }
    // Instantiate the user and database variables
    const user = getProfile()
    const db = firebase.firestore().collection("users").doc(user.name)
    const savedImagesArray = []
    db.get() 
      .then(doc => {
        if (doc.exists) {
          const documentResult = doc.data()
          // If the document exists, loop through the properties within the object
          for (const property in documentResult) {
            // This pushes the custom component into the empty savedImagesArray, this also sets the 'src' attribute of the image component to the properties within the firestore document
            savedImagesArray.push(<StyledLazyLoadedImage src={`${documentResult[property]}&h=330&w=330&fit=crop`} />)
          }
          // Invoke the state setting function to set "savedImages" state to the savedImagesArray 
          setSavedImages(savedImagesArray)
        } else {
          console.log("No document")
        }
      })
      .catch(err => console.log(err))

  }, [])
  return (
    <Fragment>
      <StyledMainContainer container>
        <Grid item lg={12}>
          {savedImages}
        </Grid>
      </StyledMainContainer>
    </Fragment>
  )
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export default Account

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
