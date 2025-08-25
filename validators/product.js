import { body, query } from "express-validator";

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
