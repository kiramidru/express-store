import { body } from "express-validator";

export const createUserValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("firstName")
    .notEmpty()
    .withMessage("First Name is required")
    .isString()
    .withMessage("First Name must be a string"),
  body("lastName")
    .optional()
    .isString()
    .withMessage("Last Name must be a string"),
  body("role")
    .optional()
    .isIn(["CUSTOMER", "SELLER"])
    .withMessage("Role must be one of: CUSTOMER, or SELLER"),
];

export const retrieveUserValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
];
