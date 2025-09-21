const express = require("express");
const { createHabit, getHabits, checkIn } = require("../controllers/habitController");
const { authMiddleware } = require("../utils/authMiddleware");

const router = express.Router();

// secure routes with JWT
router.post("/", authMiddleware, createHabit);
router.get("/", authMiddleware, getHabits);
router.post("/:id/checkin", authMiddleware, checkIn);
module.exports = router;
