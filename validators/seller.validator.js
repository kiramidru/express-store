import { body, query } from "express-validator";

export const createBrandValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("websiteUrl")
    .optional()
    .isURL()
    .withMessage("Website URL is not a valid URL"),
  body("logoUrl").optional().isURL().withMessage("logo URL is not a valid URL"),
];

export const retrieveBrandValidator = [];

export const createProductValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is Required")
    .isString()
    .withMessage("Name must be a string"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("brandId").optional().isInt().withMessage("Brand ID must be an integer"),
  body("categoryId")
    .optional()
    .isInt()
    .withMessage("Category ID must be an integer"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat()
    .withMessage("Price must be a float"),
  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isInt()
    .withMessage("Amount must be an integer."),
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
