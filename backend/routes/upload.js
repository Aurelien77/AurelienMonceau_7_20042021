const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");
const upload = require("../middlewares/upload");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, homeController.getHome);

router.post("/upload", upload.single("file"), uploadController.uploadFiles);

module.exports = router;
