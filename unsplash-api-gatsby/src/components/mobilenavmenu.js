// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  Button,
  ClickAwayListener,
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
import { StyledAvatar } from "./styledavatar"

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
const LogInNavButton = styled(Button)`
  display: none;
  color: #fff;
  @media (min-width: 708px) {
    color: #fff;
    display: initial;
  }
`
const DisplayNameMenuItem = styled(MenuItem)`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #fff;
`
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// The below logic was taken straight out of Material-UI's Menu Component example on their site
export const MobileNavMenu = ({ user }) => {
  const displayName = user.nickname ? user.nickname : user.name
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
        aria-label="Open navigation menu"
      >
        {user.name ? (
          <StyledAvatar
            src={user.picture}
            mobilenavbar={1}
            alt={user.name ? `${user.name}'s profile image` : ""}
          />
        ) : (
          <MediaMenuIcon icon={faBars} />
        )}
      </Button>
      {!user.name ? (
        <LogInNavButton onClick={() => login()}>Log in</LogInNavButton>
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
                  {user.name ? (
                    <DisplayNameMenuItem>
                      <Typography variant="subtitle2">Hello,</Typography>
                      <Typography variant="subtitle2">{displayName}</Typography>
                    </DisplayNameMenuItem>
                  ) : null}
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
