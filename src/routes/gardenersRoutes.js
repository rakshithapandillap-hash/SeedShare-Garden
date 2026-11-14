
const express = require("express");
const router = express.Router();

const gardenersController = require("../controllers/gardenersController");

router.get("/", gardenersController.getAllGardeners);
router.get("/:id", gardenersController.getGardenerById);
router.post("/", gardenersController.createGardener);
router.put("/:id", gardenersController.updateGardener);
router.delete("/:id", gardenersController.deleteGardener);

module.exports = router;
