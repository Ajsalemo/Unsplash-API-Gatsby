// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

import firebase from "./firebase"

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

const db = firebase.firestore().collection("users")

export const retrieveUserSavedImages = (user, setUserImages) => {
  const savedImagesArray = []
  if (user.name) {
    db.doc(user.name)
      .get()
      .then(doc => {
        if (doc.exists) {
          const documentResult = doc.data()
          // If the document exists, loop through the properties within the object
          for (const property in documentResult) {
            // This pushes the custom component into the empty savedImagesArray, this also sets the 'src' attribute of the image component to the properties within the firestore document
            savedImagesArray.push(documentResult[property])
          }
          setUserImages([...savedImagesArray])
        } else {
          console.log("No document")
        }
      })
      .catch(err => console.log(err))
  }
}

export const clickToLike = (user, src, setUserImages) => {
  // set the raw URL to a variable
  const imageSrc = src.urls.raw
  // Filter out illegal characters, in this case the "/" character and replace it with "|"
  // Firebase doesn't allow fields with illegal charcters to be updated
  const filterIllegalChars = imageSrc.replace(/\//g, "|")
  
  db.doc(user.name)
    .get({ source: "server" })
    .then(doc => {
      // This checks if the document exists
      if (doc.exists) {
        const imageDocument = doc.data()
        // If imageDocument is an empty object, then the below "for in" loop in the else block cannot loop through the database object from firestore, which in turn will not let any documents be added to firestore
        // This if statement tests whether or not it's empty, if it is - it will let the user be able to add documents with empty firestore data, which then in turn lets the rest of the code run
        if (
          Object.entries(imageDocument).length === 0 &&
          imageDocument.constructor === Object
        ) {
          return (
            retrieveUserSavedImages(user, setUserImages),
            db.doc(user.name).set(
              {
                [filterIllegalChars]: {
                  id: src.id, 
                  urls: {
                    raw: imageSrc,
                  },
                  user: {
                    avatar: src.user.profile_image.small,
                    href: src.user.links.html,
                    username: src.user.username,
                    name: src.user.name,
                  },
                },
              },
              // Merge a new unuiqely created field into the document
              {
                merge: true,
              }
            )
          )
        } else {
          // Target the "users" collection in Firestore
          // Set the document to a dynamic value, in this, the user email
          // Set the field to a dynamic value, which is the image being liked by the user
          // This is so all liked images are saved under the users name
          // If the field doesn't exist, Firestore will create it
          return (
            retrieveUserSavedImages(user, setUserImages),
            db.doc(user.name).set(
              {
                [filterIllegalChars]: {
                  id: src.id, 
                  urls: {
                    raw: imageSrc,
                  },
                  user: {
                    avatar: src.user.profile_image.small,
                    href: src.user.links.html,
                    username: src.user.username || src.user,
                    name: src.user.name,
                  },
                },
              },
              // Merge a new unuiqely created field into the document
              {
                merge: true,
              }
            )
          )
        }
        // If a document doesn't exist yet then create it when a user saves their first photo
      } else {
        return (
          retrieveUserSavedImages(user, setUserImages),
          db.doc(user.name).set(
            {
              [filterIllegalChars]: {
                id: src.id, 
                urls: {
                  raw: imageSrc,
                },
                user: {
                  avatar: src.user.profile_image.small,
                  href: src.user.links.html,
                  username: src.user.username || src.user,
                  name: src.user.name,
                },
              },
            },
            // Merge a new unuiqely created field into the document
            {
              merge: true,
            }
          )
        )
      }
    })
}

export const deleteSavedImage = (user, src, setUserImages) => {
  // Filter out illegal characters, in this case the "/" character and replace it with "|"
  // Firebase doesn't allow fields with illegal charcters to be updated
  const filterCharsInUserAccount = src.urls.raw.replace(/\//g, "|")

  db.doc(user.name)
    .get({ source: "server" })
    .then(doc => {
      if (doc.exists) {
        const accountImages = doc.data()
        for (const likedImages in accountImages) {
          if (likedImages === filterCharsInUserAccount) {
            return (
              retrieveUserSavedImages(user, setUserImages),
              db.doc(user.name).set(
                {
                  [filterCharsInUserAccount]: firebase.firestore.FieldValue.delete(),
                },
                {
                  merge: true,
                }
              )
            )
          }
        }
      }
    })
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
