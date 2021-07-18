const homeBuilder = require("./pageBuilders/home");

module.exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const pageBuilder = [
    homeBuilder({ createPage, graphql }),   
  ];

  await Promise.all(pageBuilder);
};
