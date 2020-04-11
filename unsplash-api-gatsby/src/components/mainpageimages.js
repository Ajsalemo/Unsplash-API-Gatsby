// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { Grid } from "@material-ui/core"
import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import "react-lazy-load-image-component/src/effects/blur.css"
import styled from "styled-components"
import { Pagination } from "../components/pagination"
import { ImageCredit, ImagesSubGrid } from "../helpers/styledcomponents"
import { clickToLike, deleteSavedImage, retrieveUserSavedImages } from "../utils/functions"
import { ActionIcons } from "./actionicons"
import ErrorComponent from "./errorcomponent"
import { ImageComponent } from "./imagecomponent"
import { LoadingContainer } from "./loadingcontainer"
import { NoImages } from "./noimages"
import { StyledAvatar } from "./styledavatar"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

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
  error,
}) => {
  const [userImages, setUserImages] = useState([])
  // If the route path is the user account page, use the images that are set in state from there
  // Else if it isn't the account route, use the images being pulled from Unsplash
  const displayImages = location === "/account" ? userImages : images

  useEffect(() => {
    retrieveUserSavedImages(user, setUserImages)
  }, [user])
  
  // If an error is thrown trying to display images(Ex. search query not found), then display the Error Component
  if (error) {
    return <ErrorComponent />
  } else if (location === "/account" && displayImages.length === 0) {
    return <NoImages userImages={userImages} />
  } else if (location === "/users" && displayImages.length === 0) {
    return null
  }

  return (
    <ImagesSubGrid item lg={12}>
      <Grid
        item
        style={{ textAlign: "center", backgroundColor: "#1e172f" }}
        lg={10}
      >
        {loading || networkStatus === 4 || displayImages === undefined ? (
          <LoadingContainer />
        ) : (
          displayImages.map((src, i) => (
            <div
              style={{ display: "inline-flex", flexDirection: "column" }}
              key={i}
            >
              <Link to="/images" state={{ user: src }} aria-label={src.description ? src.description : "An image from Unsplash"}>
                <ImageComponent
                  alt={src.description ? src.description : ""}
                  // Render whichever one of the image src paramters that gets passed through
                  src={`${src.urls.raw}&h=330&w=330&fit=crop` || src.urls.custom}
                />
              </Link>
              <UserInformationGrid item>
                {/* If the person using the application is viewing the owner of the photos profile, then hide their avatar for their pictures(while on their user profile) */}
                {!chooseImagePanelView ? (
                  <>
                    {/* Pass whichever of the three props that currently exist  */}
                    <Link to="/users" state={src.user || src.user.username} aria-label={`${src.user || src.user.username}'s profile image`}>
                      <StyledAvatar
                        src={src.user.avatar || src.user.profile_image.small}
                        pageimages={1}
                        alt={src.user.name ? `${src.user.name}'s profile image` : ""}
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
                  clickToLike={() => clickToLike(user, src, setUserImages)}
                  deleteSavedImage={() => deleteSavedImage(user, src, setUserImages)}
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
