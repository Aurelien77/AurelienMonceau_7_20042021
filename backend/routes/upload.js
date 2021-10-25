const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/upload");
const homeController = require("../controllers/home");

const upload = require("../middlewares/upload");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", homeController.getHome);

router.post(
  "/upload",

  upload.single("file"),
  uploadController.uploadFiles
);

module.exports = router;

/* router.post("/login", userCtrl.login);

router.get("/auth", validateToken, userCtrl.auth);

router.post("/", userCtrl.signup);

router.get("/basicinfo/:id", userCtrl.basicInfo);

router.put("/changepassword", validateToken, userCtrl.changepassword); */
