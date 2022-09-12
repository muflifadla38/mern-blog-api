const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/auth");

const router = express.Router();

router.post("/login", authController.login); //Login

// Register
router.post(
  "/register",
  [
    body("name").isLength({ max: 20 }).withMessage("Input Nama maksimal 20 karakter"),
    body("password").isLength({min: 8}).withMessage("Input Password minimal 8 karakter")
  ],
  authController.register
);

module.exports = router;
