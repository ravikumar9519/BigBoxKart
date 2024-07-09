import express from "express";
const router = express.Router();

import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUser,
  deleteUser,
  getUserById,
  updateUser,
} from "../controller/userController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(protect, admin, getAllUser).post(registerUser);
router.route("/logout").post(logoutUser);
router.route("/login").post(loginUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
