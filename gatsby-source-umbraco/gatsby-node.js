const homeHelper = require("./helpers/home");
const nodeHelpers = [homeHelper];

module.exports.sourceNodes = async (props, pluginConfig) => {
  await Promise.all(
    nodeHelpers.map(async (nodeHelper) => {
      await nodeHelper.createNodes(props, pluginConfig);
    })
  );
};
