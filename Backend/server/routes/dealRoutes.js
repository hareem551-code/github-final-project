const express = require("express");
const router = express.Router();
const { getAllDeals, createDeal } = require("../Controllers/dealController");

router.get("/", getAllDeals);
router.post("/", createDeal);

module.exports = router;