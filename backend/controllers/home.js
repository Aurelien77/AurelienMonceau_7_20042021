const path = require("path");

const home = (req, res) => {
  return res.sendFile(path.join(`${__dirname}/upload`));
};

module.exports = {
  getHome: home,
};
