module.exports = {
  siteMetadata: {
    title: `Flickr API Gatsby`,
    description: `Inspiration taken from Flickr to create an image viewing app with Gatsby.`,
    author: `Anthony Salemo`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/background_images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Flickr API Gatsby`,
        short_name: `FlickrLA`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [{ family: `Pacifico` }],
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-theme-material-ui`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
