const express = require("express");
const {
  createCategoryController,
  getAllCategoryController,
} = require("../controllers/categoryController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//router
// Create Category || POST
router.post("/create", authMiddleware, createCategoryController);

// GET ALL CATEGORY
router.get("/getAll", getAllCategoryController);

module.exports = router;
