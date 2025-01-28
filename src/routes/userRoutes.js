import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController.js";

import validateUser from "../middlewares/inputValidator.js";
import authMiddleware from "../middlewares/auth.js"


const router = express.Router();


router.post("/user",authMiddleware ,validateUser, createUser);
router.get("/user",authMiddleware, getAllUsers);
router.get("/user/:id",authMiddleware, getUserById);
router.put("/user/:id",authMiddleware, validateUser, updateUser);
router.delete("/user/:id",authMiddleware, deleteUser);



export default router;
