// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Grid } from "@material-ui/core"
import React from "react"
import "react-lazy-load-image-component/src/effects/blur.css"
import styled from "styled-components"
import { Pagination } from "../components/pagination"
import {
  FlexCenterGrid,
  StyledAvatar,
  StyledLazyLoadedImage,
  ImagesSubGrid,
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
  color: red;
  &:hover {
    cursor: pointer;
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

export const MainPageImages = ({
  images,
  totalPages,
  fetchMore,
  loading,
  networkStatus,
  location,
  user,
}) => (
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
            key={src.id}
          >
            <StyledLazyLoadedImage
              alt={""}
              // Render whichever one of the image src paramters that gets passed through
              src={src.urls.custom || `${src.urls.raw}&h=330&w=330&fit=crop`}
              effect="blur"
            />
            <UserInformationGrid item>
              <StyledAvatar src={src.user.profile_image.small} pageimages={1} />
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
              {user.name ? (
                <LikePhotoIcon
                  icon={faHeart}
                  onClick={() => clickToLike(user, src)}
                />
              ) : null}
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

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
