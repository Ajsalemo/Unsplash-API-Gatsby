// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import React from "react"
import { GET_USER_PROFILE } from "../apollo/queries"
import { Footer } from "../components/footer"
import { MainNavbar } from "../components/mainnavbar"
import { UserProfileAvatar } from "../components/userprofileavatar"
import { StyledMainContainer } from "../helpers/styledcomponents"
import { getProfile } from "../utils/auth"
import { useQuery } from "@apollo/react-hooks"
import { LoadingContainer } from "../components/loadingcontainer"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const Users = state => {
  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: {
      username: state.location.state.username,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  })
  if (error) return `Error: ${error.message}`
  if (loading) return <LoadingContainer />
  
  return (
    <StyledMainContainer container>
      <MainNavbar user={getProfile()} />
      <UserProfileAvatar userInfo={data.getUserProfile} />
      <Footer />
    </StyledMainContainer>
  )
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export default Users

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
