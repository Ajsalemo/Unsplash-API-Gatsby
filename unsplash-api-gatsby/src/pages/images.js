// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { useQuery } from "@apollo/react-hooks"
import { Grid } from "@material-ui/core"
import { Link } from "gatsby"
import React from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import styled from "styled-components"
import { GET_SPECIFIED_PHOTO } from "../apollo/queries"
import { ActionIcons } from "../components/actionicons"
import ErrorComponent from "../components/errorcomponent"
import { Footer } from "../components/footer"
import { LoadingContainer } from "../components/loadingcontainer"
import { MainNavbar } from "../components/mainnavbar"
import { StyledAvatar } from "../components/styledavatar"
import { ImageCredit, StyledMainContainer } from "../helpers/styledcomponents"
import placeholder from "../images/placeholder.jpg"
import { getProfile } from "../utils/auth"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const SingleLoadedImageGrid = styled(Grid)`
  height: auto;
  width: 100%;
  background-color: #1e172f;
  padding-bottom: 2em;
  text-align: center;
  display: flex;
  flex-direction: column;
`
const ImageAuthorGrid = styled(Grid)`
  align-items: center;
  padding-top: 2em;
  display: flex;
  justify-content: space-evenly;
`
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const Images = state => {
  const user = getProfile()

  const { loading, error, data } = useQuery(GET_SPECIFIED_PHOTO, {
    variables: {
      id: state.location.state.user.id,
    },
    fetchPolicy: "cache-and-network",
  })

  if (loading) return <LoadingContainer />
  if (error) return <ErrorComponent />

  return (
    <StyledMainContainer container>
      <MainNavbar user={user} />
      <SingleLoadedImageGrid item>
        <LazyLoadImage
          src={data.getSpecifiedPhoto.urls.regular}
          effect="blur"
          placeholderSrc={placeholder}
        />
        <ImageAuthorGrid item>
          <Link
            to="/users"
            state={
              state.location.state.user.user ||
              state.location.state.user.user.username
            }
          >
            <StyledAvatar
              src={
                state.location.state.user.user.avatar ||
                state.location.state.user.user.profile_image.small
              }
              pageimages={1}
            />
          </Link>
          <ImageCredit>
            Photo by{" "}
            <a
              href={
                state.location.state.user.user.href ||
                state.location.state.user.user.links.html
              }
              style={{ color: "#fff" }}
              rel="noopener noreferrer"
            >
              {state.location.state.user.user.name}
            </a>
          </ImageCredit>
          <ActionIcons
            location={state.location.pathname}
            user={user}
            src={data.getSpecifiedPhoto}
            userImages={state.location.state.userSavedImages}
          />
        </ImageAuthorGrid>
      </SingleLoadedImageGrid>
      <Footer />
    </StyledMainContainer>
  )
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export default Images

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
