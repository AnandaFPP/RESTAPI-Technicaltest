const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const {protect} = require('../middleware/auth')

router

  .post("/register", usersController.registerUser)
  .post("/login", usersController.loginUser)
  .get("/profile", protect, usersController.profileUser)
  .post("/refreshToken", protect, usersController.refreshToken)

module.exports = router;