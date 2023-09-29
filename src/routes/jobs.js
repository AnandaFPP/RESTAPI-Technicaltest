const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobs");
const {protect} = require('../middleware/auth')

router
  .get("/", protect, jobController.getAllJobs)
  .get("/:id", protect, jobController.getDetailJob)
  .post("/", protect, jobController.createJob)
  .put("/:id", protect, jobController.updateJob)

module.exports = router;