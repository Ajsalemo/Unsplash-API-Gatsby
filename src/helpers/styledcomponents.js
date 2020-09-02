// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

// General consolidated styles that can be shared between components

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Grid } from "@material-ui/core"
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
export const ImagesSubGrid = styled(FlexCenterGrid)`
  background-color: #1e172f;
  padding-bottom: 3.5em;
`
export const LikePhotoIcon = styled(FontAwesomeIcon)`
  color: ${props => (props.liked ? "red" : "white")};
  transition: all 0.5s ease-in-out;
  transform: scale(1);
  &:hover {
    cursor: ${props => (props.unlikephoto ? "initial" : "pointer")};
    transition: all 0.5s ease-in-out;
    transform: ${props => (props.unlikephoto ? "scale(1)" : "scale(1.3)")};
  }
`
export const ImageCredit = styled.span`
  color: #fff;
  margin-top: -0.5em;
  padding-left: 1em;
  font-size: 0.9em;
`

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
