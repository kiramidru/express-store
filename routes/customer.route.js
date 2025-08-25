import express from "express";

import {
  verifyToken,
  isCustomer,
  validateRequest,
} from "../middleware/index.js";

import * as customerValidator from "../validators/customer.validator.js";
import * as customerController from "../controllers/customer.controller.js";

const router = express.Router();

router.use(verifyToken);
router.use(isCustomer);

router.post(
  "/order",
  customerValidator.createOrderValidator,
  validateRequest,
  customerController.CreateOrder,
);

router.get(
  "/order",
  customerValidator.retrieveOrderValidator,
  validateRequest,
  customerController.getFilteredOrders,
);

router.patch(
  "/order",
  customerValidator.updateOrderValidator,
  validateRequest,
  customerController.updateOrder,
);

router.get(
  "/product",
  customerValidator.retrieveProductValidator,
  validateRequest,
  customerController.getFilteredProducts,
);

router.get(
  "/profile",
  customerValidator.retrieveProductValidator,
  validateRequest,
  customerController.getProfile,
);
export default router;
