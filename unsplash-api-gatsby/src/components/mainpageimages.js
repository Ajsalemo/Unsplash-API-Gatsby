// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { Grid } from "@material-ui/core"
import React from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import styled from "styled-components"
import { FlexCenterGrid } from "../helpers/styledcomponents"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const StyledLazyLoadedImage = styled(LazyLoadImage)`
  border: 2px solid #fff;
  border-radius: 4%;
  margin: 0.4em;
`
const MainPageImagesGrid = styled(FlexCenterGrid)`
  background-color: #1e172f;
`
const ImageCredit = styled.span`
  color: #fff;
  margin-top: -0.5em;
  padding-bottom: 1em;
  font-size: 0.8em;
`
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export const MainPageImages = ({ images }) => (
  <MainPageImagesGrid item lg={12}>
    <Grid
      item
      style={{ textAlign: "center", backgroundColor: "#1e172f" }}
      lg={10}
    >
      {images.map(src => (
        <div style={{ display: "inline-flex", flexDirection: "column" }}>
          <StyledLazyLoadedImage
            alt={""}
            // Render whichever one of the image src paramters that gets passed through
            src={src.urls.custom || `${src.urls.raw}&h=330&w=330&fit=crop`}
            key={src.id}
            effect="blur"
          />
          <ImageCredit>Photo by <a href="#" style={{ color: "#fff" }}>{src.user.name}</a></ImageCredit>
        </div>
      ))}
    </Grid>
  </MainPageImagesGrid>
)

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
