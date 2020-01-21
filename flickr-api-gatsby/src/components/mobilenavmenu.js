// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import React, { useState, useRef, useEffect } from "react"
import {
  Button,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuList,
  MenuItem,
} from "@material-ui/core"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { Link } from "gatsby"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const MobileNavDiv = styled.div`
  display: flex;
  @media (min-width: 700px) {
    display: none;
  }
`
const MobileNavPaper = styled(Paper)`
  border: 1px solid #fff;
  border-radius: 0;
  color: #fff;
  background-color: #1e172f;
`

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// The below logic was taken straight out of Material-UI's Menu Component example on their site
export const MobileNavMenu = () => {
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
    <MobileNavDiv>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <FontAwesomeIcon icon={faBars} style={{ color: "#fff" }} size="2x" />
        </Button>
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
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Sign in</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </MobileNavPaper>
            </Grow>
          )}
        </Popper>
      </div>
    </MobileNavDiv>
  )
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
