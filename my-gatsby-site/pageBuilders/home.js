const path = require("path");

module.exports = ({ createPage }) => {
  const component = path.resolve(
    process.cwd(),
    "../my-gatsby-site/src/templates/Home/Home.js"
  );

  createPage({
    path: "/",
    component,
    context: {
      name: "Home",
    },
  });
};
