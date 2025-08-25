import express from "express";

import { isSeller, verifyToken, validateRequest } from "../middleware/index.js";

import * as sellerValidator from "../validators/seller.validator.js";
import * as sellerController from "../controllers/seller.controller.js";

const router = express.Router();
router.use(verifyToken);
router.use(isSeller);

router.post(
  "/brand",
  sellerValidator.createBrandValidator,
  validateRequest,
  sellerController.CreateBrand,
);

router.post(
  "/product",
  sellerValidator.createProductValidator,
  validateRequest,
  sellerController.CreateProduct,
);

router.get(
  "/product",
  sellerValidator.retrieveProductValidator,
  validateRequest,
  sellerController.getFilteredProducts,
);

router.get(
  "/order",
  sellerValidator.retrieveOrderValidator,
  validateRequest,
  sellerController.getFilteredOrders,
);

router.patch(
  "/order",
  sellerValidator.updateOrderValidator,
  validateRequest,
  sellerController.updateOrder,
);

export default router;
