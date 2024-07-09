import express from "express";
const router = express.Router();

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  searchProduct,
  getBooks,
  getFoods,
  getElectronics,
} from "../controller/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

router.route("/:id/reviews").post(protect, createProductReview);
router.route("/search/:keyword").post(searchProduct);
router.route("/books").post(getBooks);
router.route("/foods").post(getFoods);
router.route("/electronics").post(getElectronics);

export default router;
