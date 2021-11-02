const fs = require("fs");
const uploadController = require("../controllers/upload");
const { Users } = require("../models");

exports.uploadFiles = async (req, res) => {
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.send(`vous devez choisir un fichier.`);
    }

    const user = await Users.findOne({
      where: { id: req.params.userId },
    });

    Users.update(
      { photo_profil: req.file.filename },
      { where: { id: req.params.userId } }
    ).then(() => {
      return res.redirect("back");
    });
  } catch (error) {
    console.log(error);
    return res.send(`Erreur pedant la tentative d'upload de l'image: ${error}`);
  }
};
