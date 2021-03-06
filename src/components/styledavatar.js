// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import React from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import styled from "styled-components"
import placeholder from "../images/placeholder.jpg"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const StyledAvatarComponent = styled(LazyLoadImage)`
  height: ${props => (props.mobilenavbar ? "4em" : null)};
  border-radius: 50%;
  border: 3px solid #fff;
  transition: all 0.5s ease-in-out !important;
  &:hover {
    transition: all 0.5s ease-in-out !important;
    cursor: pointer;
    border: 3px solid red;
  }
`
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export const StyledAvatar = ({ src, pageimages, mobilenavbar, alt }) => (
  <StyledAvatarComponent
    src={src}
    effect="blur"
    placeholderSrc={placeholder}
    pageimages={pageimages}
    mobilenavbar={mobilenavbar}
    alt={alt}
  />
)

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
