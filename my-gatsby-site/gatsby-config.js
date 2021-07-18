const path = require("path");

require("dotenv").config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
});

module.exports = {
  siteMetadata: {
    title: "My Gatsby Site",
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: require.resolve(`../gatsby-source-umbraco`),
      options: {
        apiURL: process.env.API_URL,
      },
    },
  ],
};
