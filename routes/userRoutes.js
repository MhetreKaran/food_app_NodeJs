const express = require("express");
const { getUserController, updateUserController, updatePasswordController, deleteUserController } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//routes
//GET USER || GET
router.get("/getUser", authMiddleware, getUserController);

//UPDATE USER
router.put("/updateUser",authMiddleware, updateUserController)

//Password Update
router.post("/updatePassword", authMiddleware, updatePasswordController);

// delete user
router.delete('/deleteUser/:id',authMiddleware,deleteUserController)

module.exports = router;
