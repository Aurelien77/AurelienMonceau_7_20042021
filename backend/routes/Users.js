const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");
const userCtrl = require("../controllers/users");

router.post("/login", userCtrl.login);

router.get("/auth", validateToken, userCtrl.auth);

router.post("/", userCtrl.signup);

router.get("/basicinfo/:id", userCtrl.basicInfo);

router.put("/changepassword", validateToken, userCtrl.changepassword);

router.delete("/:id", userCtrl.delete);

module.exports = router;
