const express = require("express");
const {
  createResturantController,
  getAllResturantController,
  getResturantByIdController,
  deleteResturantController,
} = require("../controllers/resturantController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//Router
//Create Resturant || POST
router.post("/create", authMiddleware, createResturantController);
//Get All Resturant || GET
router.get("/getAll", getAllResturantController);
// GET RESTURANT BY ID
router.get("/getResturant/:id", getResturantByIdController);
//DELETE RESTURANT
router.delete("/delete/:id", authMiddleware, deleteResturantController);

module.exports = router;
