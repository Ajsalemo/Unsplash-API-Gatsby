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
    if (!isAuthenticated()) {
      login()
      return <p>Redirecting to login...</p>
    }
    const user = getProfile()
    const db = firebase.firestore().collection("users").doc(user.name)
    const savedImagesArray = []
    db.get() 
      .then(doc => {
        if (doc.exists) {
          const documentResult = doc.data()
          for (const property in documentResult) {
            console.log(`${documentResult[property]}`)
            savedImagesArray.push(documentResult[property])
          }
        } else {
          console.log("No document")
        }
      })
      .catch(err => console.log(err))

      setSavedImages(savedImagesArray)
      console.log(savedImages)
  }, [])
  return (
    <Fragment>
      <StyledMainContainer container>
        <Grid item lg={12}>
          {savedImages.map(src => (
            <StyledLazyLoadedImage src={`${src}&h=330&w=330&fit=crop`} />
          ))}
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
