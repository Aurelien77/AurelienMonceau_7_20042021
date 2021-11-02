const path = require("path");

exports.getHome = (req, res) => {
  return res.sendFile(path.join(`${__dirname}../index.js`));
};
