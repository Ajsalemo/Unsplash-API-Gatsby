// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { Grid } from "@material-ui/core"
import React from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import styled from "styled-components"
import { FlexCenterGrid, StyledAvatar } from "../helpers/styledcomponents"
import { Pagination } from "../components/pagination"
import { LoadingContainer } from "./loadingcontainer"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const StyledLazyLoadedImage = styled(LazyLoadImage)`
  border: 2px solid #fff;
  border-radius: 4%;
  margin: 0.4em;
`
const MainPageImagesGrid = styled(FlexCenterGrid)`
  background-color: #1e172f;
  padding-bottom: 3.5em;
`
const ImageCredit = styled.span`
  color: #fff;
  margin-top: -0.5em;
  padding-left: 1em;
  font-size: 0.8em;
`
const UserInformationGrid = styled(FlexCenterGrid)`
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
}) => (
  <MainPageImagesGrid item lg={12}>
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
              <StyledAvatar src={src.user.profile_image.small} pageimages />
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
            </UserInformationGrid>
          </div>
        ))
      )}
      {/* If the query returns no results then do not display the pagination component */}
      {totalPages === 0 || location === "/main" ? null : (
        <Pagination totalPages={totalPages} fetchMore={fetchMore} />
      )}
    </Grid>
  </MainPageImagesGrid>
)

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
