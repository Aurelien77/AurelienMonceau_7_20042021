const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/upload");
const homeController = require("../controllers/home");

const upload = require("../middlewares/upload");

router.get("/", homeController.getHome);

router.post("/:userId", upload.single("file"), uploadController.uploadFiles);

router.post(
  "/upload",

  upload.single("file"),
  uploadController.uploadFiles
);

module.exports = router;
