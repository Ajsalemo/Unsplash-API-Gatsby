// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faHeart, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Grid, Typography } from "@material-ui/core"
import React from "react"
import { ImageComponent } from "./imagecomponent"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export const UserProfileAvatar = ({ userInfo }) => (
  <Grid item style={{ paddingBottom: "3em", textAlign: "center" }}>
    <ImageComponent userprofile={1} src={userInfo.profile_image.large} />
    <Typography
      style={{ fontFamily: "Pacifico", color: "#fff" }}
      variant="subtitle2"
    >
      {userInfo.name}
    </Typography>
    <Typography
      style={{ color: "#fff", paddingTop: "2em" }}
      variant="subtitle2"
    >
      @{userInfo.username}
    </Typography>
    <Typography style={{ color: "#fff" }} variant="subtitle2">
      <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: "0.7em" }} />
      {userInfo.location}
    </Typography>
    {userInfo.instagram_username !== null ? (
      <Typography style={{ color: "#fff" }} variant="subtitle2">
        <FontAwesomeIcon
          icon={faInstagram}
          style={{ marginRight: "0.7em", color: "#fccc63" }}
        />
        <a
          href={`https://www.instagram.com/${userInfo.instagram_username}`}
          rel="noopener noreferrer"
          target="_blank"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          {userInfo.instagram_username}
        </a>
      </Typography>
    ) : null}
    {userInfo.twitter_username !== null ? (
      <Typography style={{ color: "#fff" }} variant="subtitle2">
        <FontAwesomeIcon
          icon={faTwitter}
          style={{ marginRight: "0.7em", color: "#1DA1F2" }}
        />
        <a
          href={`https://www.twitter.com/${userInfo.instagram_username}`}
          rel="noopener noreferrer"
          target="_blank"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          {userInfo.twitter_username}
        </a>
      </Typography>
    ) : null}
    <Typography style={{ color: "#fff" }} variant="subtitle2">
      <FontAwesomeIcon
        icon={faHeart}
        style={{ marginRight: "0.7em", color: "red" }}
      />
      {userInfo.total_likes}
    </Typography>
    <Grid item style={{ paddingTop: "2em" }} variant="subtitle2">
      <Typography style={{ color: "#fff" }}>{userInfo.bio}</Typography>
    </Grid>
  </Grid>
)

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export default UserProfileAvatar

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
