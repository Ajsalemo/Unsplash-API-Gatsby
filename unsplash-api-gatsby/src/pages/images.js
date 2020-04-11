// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { useQuery } from "@apollo/react-hooks"
import { Grid, Typography } from "@material-ui/core"
import { Link, navigate } from "gatsby"
import React, { useEffect, useState } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import styled from "styled-components"
import { GET_SPECIFIED_PHOTO } from "../apollo/queries"
import ErrorComponent from "../components/errorcomponent"
import { Footer } from "../components/footer"
import { LoadingContainer } from "../components/loadingcontainer"
import { MainNavbar } from "../components/mainnavbar"
import { StyledAvatar } from "../components/styledavatar"
import {
  ImageCredit,
  StyledMainContainer,
  FlexCenterGrid,
} from "../helpers/styledcomponents"
import placeholder from "../images/placeholder.jpg"
import { getProfile } from "../utils/auth"
import { SEO } from "../components/SEO"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faHeart,
  faDownload,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons"
import { MobileHomeNav } from "../components/mobilehomenav"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const SingleLoadedImageGrid = styled(Grid)`
  height: auto;
  width: 100%;
  background-color: #1e172f;
  padding-bottom: 6em;
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
const StatisticsGrid = styled(FlexCenterGrid)`
  align-items: center;
`
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const Images = state => {
  // Check whether or not an id being passed in for the photo is valid
  const isPhotoIdValid = state.location.state
    ? state.location.state.user.id
    : navigate("/main")

  const user = getProfile()

  const { loading, error, data } = useQuery(GET_SPECIFIED_PHOTO, {
    variables: {
      id: isPhotoIdValid,
    },
  })

  const chooseImageBasedOnSize = size => {
    if (size.width <= 600) {
      return `${data.getSpecifiedPhoto.urls.raw}&h=350&w=350&fit=crop`
    } else if (size.width > 600 && size.width < 1140) {
      return `${data.getSpecifiedPhoto.urls.raw}&h=600&w=600&fit=crop`
    } else {
      return data.getSpecifiedPhoto.urls.regular
    }
  }

  const useWindowSize = () => {
    const isClient = typeof window === "object"

    const getSize = () => {
      return {
        width: isClient ? window.innerWidth : undefined,
      }
    }

    const [windowSize, setWindowSize] = useState(getSize)

    useEffect(() => {
      if (!isClient) {
        return false
      }

      const handleResize = () => {
        setWindowSize(getSize())
      }

      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }, []) // Empty array ensures that effect is only run on mount and unmount
    return windowSize
  }

  const size = useWindowSize()

  if (loading) return <LoadingContainer />
  if (error) return <ErrorComponent />

  return (
    <>
      <SEO
        title="Something like Unsplash"
        description="A site to experiment with Unsplash's API"
        pathname="/images"
      />
      <StyledMainContainer container>
        <MainNavbar user={user} />
        <MobileHomeNav />
        <SingleLoadedImageGrid item>
          <LazyLoadImage
            src={chooseImageBasedOnSize(size)}
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
                  state.location.state.user.user.profile_image.medium
                }
                pageimages={1}
                alt={state.location.state.user.user.name ? `${state.location.state.user.user.name}'s profile image` : ""}
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
          </ImageAuthorGrid>
          <Grid item>
            {data.getSpecifiedPhoto.description ? (
              <StatisticsGrid item>
                <Typography variant="subtitle2" style={{ color: "#fff" }}>
                  {data.getSpecifiedPhoto.description}
                </Typography>
              </StatisticsGrid>
            ) : null}
            <StatisticsGrid item>
              <FontAwesomeIcon
                icon={faHeart}
                style={{ color: "red", paddingRight: "0.2em" }}
              />
              <Typography variant="subtitle2" style={{ color: "#fff" }}>
                {data.getSpecifiedPhoto.likes}{" "}
              </Typography>
            </StatisticsGrid>
            <StatisticsGrid item>
              <FontAwesomeIcon
                icon={faDownload}
                style={{ color: "#fff", paddingRight: "0.2em" }}
              />
              <Typography variant="subtitle2" style={{ color: "#fff" }}>
                {data.getSpecifiedPhoto.downloads}{" "}
              </Typography>
            </StatisticsGrid>
            {data.getSpecifiedPhoto.location.city ||
            data.getSpecifiedPhoto.location.country ? (
              <StatisticsGrid>
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  style={{ color: "#fff", paddingRight: "0.2em" }}
                />
                <Typography variant="subtitle2" style={{ color: "#fff" }}>
                  {data.getSpecifiedPhoto.location.city}
                  {data.getSpecifiedPhoto.location.city ? ", " : null}
                  {data.getSpecifiedPhoto.location.country}
                </Typography>
              </StatisticsGrid>
            ) : null}
          </Grid>
        </SingleLoadedImageGrid>
        <Footer />
      </StyledMainContainer>
    </>
  )
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export default Images

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
