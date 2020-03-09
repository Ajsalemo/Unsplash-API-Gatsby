// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

// General consolidated styles that can be shared between components

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Grid } from "@material-ui/core"
import { LazyLoadImage } from "react-lazy-load-image-component"
import styled from "styled-components"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export const FlexCenterGrid = styled(Grid)`
  display: flex;
  justify-content: center;
`

export const StyledMainContainer = styled(FlexCenterGrid)`
  background-color: #1e172f;
  height: 100vh;
  padding-top: 5em;
`
export const StyledAvatar = styled(LazyLoadImage)`
  width: ${props => props.pageimages ? "3em" : null};
  height: ${props => props.mobilenavbar ? "3em" : null};
  border-radius: 50%;
  border: 3px solid #fff;
  transition: all 0.5s ease-in-out;
  &:hover {
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    border: 3px solid red;
  }
`
export const StyledLazyLoadedImage = styled(LazyLoadImage)`
  border: 2px solid #fff;
  border-radius: 4%;
  margin: 0.4em;
  height: 330px;
  width: 330px;
`
export const ImagesSubGrid = styled(FlexCenterGrid)`
  background-color: #1e172f;
  padding-bottom: 3.5em;
`
export const LikePhotoIcon = styled(FontAwesomeIcon)`
  color: ${props => (props.unlikephoto ? "red" : "white")};}
  transition: all 0.5s ease-in-out;
  transform: scale(1);
  &:hover {
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    transform: ${props => (props.unlikephoto ? "scale(1)" : "scale(1.3)")};
  }
`
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
