const axios = require("axios");

module.exports.createNodes = async (
  { actions: { createNode }, createContentDigest, createNodeId },
  pluginConfig
) => {
  const {
    data,
  } = await axios({
    method: "get",
    baseURL: 'https://umbracoapp.azurewebsites.net',
    url: "umbraco/api/MovieApi/GetMovies",
    headers: {
      "x-origin": 'https://umbracoapp.azurewebsites.net',
    },
  });

  createNode({
    ...data,
    id: createNodeId("homepage"),
    parent: null,
    children: [],
    internal: {
      type: "UmbracoData",
      contentDigest: createContentDigest(data),
    },
  });
};
