const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

const likesCtrl = require("../controllers/likes");

router.post("/", validateToken, likesCtrl.likes);

module.exports = router;
