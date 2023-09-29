const express = require("express");
const router = express.Router();
const usersRouter = require("../routes/users");
const jobRouter = require("../routes/jobs");

router.use("/users", usersRouter);
router.use("/jobs", jobRouter);

module.exports = router;
