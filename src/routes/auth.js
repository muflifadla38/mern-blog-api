const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

router.post("/login", authController.login); //Login
router.post("/register", authController.register); //Register

module.exports = router;
