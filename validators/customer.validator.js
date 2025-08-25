import { body, query } from "express-validator";

export const createOrderValidator = [
  body("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isInt()
    .withMessage("Product ID must be a string"),

  body("amount")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),
];

export const retrieveOrderValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be an integer"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be an integer"),
];

export const updateOrderValidator = [
  body("id")
    .notEmpty()
    .withMessage("ID is required")
    .isInt()
    .withMessage("ID must be a number"),
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["PENDING", "PROCESSING", "SHIPPED", "CANCELLED"])
    .withMessage(
      "Status must be one of: PENDING, PROCESSING, SHIPPED, or CANCELLED",
    ),
];

export const retrieveProductValidator = [
  query("categoryId")
    .optional()
    .isInt()
    .withMessage("Category ID must be an integer"),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be an integer "),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be an integer"),
];
