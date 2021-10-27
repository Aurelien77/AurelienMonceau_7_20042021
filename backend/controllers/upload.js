const fs = require("fs");
const uploadController = require("../controllers/upload");
const { Users } = require("../models");

exports.uploadFiles = async (req, res) => {
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }

    const user = await Users.findOne({
      where: { id: req.params.userId },
    });

    /* 	const ancien_fichier = __basedir + "/ressources/static/assets/uploads/" + user.photo_profil;
	fs.unlinkSync(ancien_fichier); */

    Users.update(
      { photo_profil: req.file.filename },
      { where: { id: req.params.userId } }
    ).then(() => {
      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

/* module.exports = {
  uploadFiles,
}; */
