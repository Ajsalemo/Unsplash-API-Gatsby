// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import React, { useState, useEffect, Fragment } from "react"
import { ApolloClientHOC } from "./src/apollo/client"
import { silentAuth } from "./src/utils/auth"
import { LoadingContainer } from "./src/components/loadingcontainer"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const SessionCheck = ({ children }) => {
  const [loading, setLoading] = useState(true)
  // When this component mounts, call the silentAuth method and change the loading state to false
  useEffect(() => {
    silentAuth(() => setLoading(false))
  }, [])
  // While loading is false, render the app
  if (loading === true)
    return (
      <div style={{ margin: 0 }}>
        <LoadingContainer />
      </div>
    )
  return loading === false && <Fragment>{children}</Fragment>
}

export const wrapRootElement = ({ element }) => (
  <ApolloClientHOC>
    <SessionCheck>{element}</SessionCheck>
  </ApolloClientHOC>
)

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
