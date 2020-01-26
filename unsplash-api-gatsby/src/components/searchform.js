// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import { useApolloClient } from "@apollo/react-hooks"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { InputAdornment, TextField, CircularProgress } from "@material-ui/core"
import { Form, Formik } from "formik"
import { navigate } from "gatsby"
import React from "react"
import styled from "styled-components"
import { SEARCH_IMAGES_BY_KEYWORD } from "../apollo/queries"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const StyledTextField = styled(TextField)`
  .MuiInput-underline:before {
    border-bottom: 2px solid #fff;
  }
  /* hover (double-ampersand needed for specificity reasons. */
  && .MuiInput-underline:hover:before {
    border-bottom: 2px solid lightblue;
  }
  /* focused */
  .MuiInput-underline:after {
    border-bottom: 2px solid #f00;
  }
  .MuiInputBase-input {
    color: #fff;
  }
`
const SubmitButton = styled.button`
  background-color: transparent;
  border: none;
  &:hover {
    cursor: pointer;
  }
`
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

export const SearchForm = () => {
  const apolloClient = useApolloClient()
  return (
    <Formik
      initialValues={{ search: "" }}
      onSubmit={(values, { setSubmitting }) => {
        apolloClient
          .query({
            query: SEARCH_IMAGES_BY_KEYWORD,
            variables: {
              query: values.search,
            },
          })
          .then(data => {
            setSubmitting(false)
            if (data) {
              navigate("/image-results", {
                state: data,
              })
            }
          })
      }}
    >
      {({ isSubmitting, values, handleChange }) => (
        <Form>
          <StyledTextField
            id="main-nav"
            placeholder="Search for images"
            name="search"
            value={values.search}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SubmitButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <CircularProgress />
                    ) : (
                      <FontAwesomeIcon
                        icon={faSearch}
                        style={{ color: "#fff" }}
                      />
                    )}
                  </SubmitButton>
                </InputAdornment>
              ),
            }}
          />
        </Form>
      )}
    </Formik>
  )
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
