
const express = require("express");
const router = express.Router();

const availabilityController = require("../controllers/availabilityController");

// GET plots available on a particular date
router.get("/", availabilityController.getAvailablePlots);

module.exports = router;
