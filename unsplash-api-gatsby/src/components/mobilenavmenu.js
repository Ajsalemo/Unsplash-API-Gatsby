// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  Button,
  ClickAwayListener,
  Grid,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from "@material-ui/core"
import { Link } from "gatsby"
import React, { useEffect, useRef, useState } from "react"
import "react-lazy-load-image-component/src/effects/blur.css"
import styled from "styled-components"
import { login, logout } from "../utils/auth"
import { StyledAvatar } from "../helpers/styledcomponents"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const MobileNavPaper = styled(Paper)`
  border: 1px solid #fff;
  border-radius: 0;
  color: #fff;
  background-color: #1e172f;
`
const MediaMenuIcon = styled(FontAwesomeIcon)`
  color: #fff;
  size: 3em;
  display: initial;
  @media (min-width: 708px) {
    display: none;
  }
`
const NonMobileNavLinks = styled(Grid)`
  display: none;
  @media (min-width: 708px) {
    display: flex;
  }
`
const ConditionalDesktopLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  padding: 0em 0.4em;
`

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// The below logic was taken straight out of Material-UI's Menu Component example on their site
export const MobileNavMenu = ({ user }) => {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setOpen(false)
  }

  const handleListKeyDown = event => {
    if (event.key === "Tab") {
      event.preventDefault()
      setOpen(false)
    }
  }

  // Return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }
    prevOpen.current = open
  }, [open])

  return (
    <div>
      <Button
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        {user.name ? (
          <StyledAvatar src={user.picture} mobilenavbar />
        ) : (
          <MediaMenuIcon icon={faBars} />
        )}
      </Button>
      {!user.name ? (
        <NonMobileNavLinks>
          <ConditionalDesktopLink to="/main">
            <Typography>Home</Typography>
          </ConditionalDesktopLink>
          <Button
            style={{ color: "#fff", padding: "0em" }}
            onClick={() => login()}
          >
            Sign in
          </Button>
        </NonMobileNavLinks>
      ) : null}
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <MobileNavPaper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <Link
                    to="/main"
                    onClick={handleClose}
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    <MenuItem onClick={handleClose}>Home</MenuItem>
                  </Link>
                  {/* If a user is logged in, then render these conditional components */}
                  {user.name ? (
                    <Link
                      to="/account"
                      onClick={handleClose}
                      style={{ textDecoration: "none", color: "#fff" }}
                    >
                      <MenuItem onClick={handleClose}>Account</MenuItem>
                    </Link>
                  ) : null}
                  {user.name ? (
                    <MenuItem onClick={() => logout()}>Sign out</MenuItem>
                  ) : (
                    <MenuItem
                      onClick={() => {
                        login()
                        handleClose()
                      }}
                    >
                      Sign in
                    </MenuItem>
                  )}
                </MenuList>
              </ClickAwayListener>
            </MobileNavPaper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
