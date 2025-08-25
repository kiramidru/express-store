import express from "express";

import { isAdmin, verifyToken, validateRequest } from "../middleware/index.js";
import * as adminValidator from "../validators/admin.validator.js";
import * as adminController from "../controllers/admin.controller.js";

const router = express.Router();

router.use(verifyToken);
router.use(isAdmin);

router.post(
  "/category",
  adminValidator.createCategoryValidator,
  validateRequest,
  adminController.createCategory,
);

router.post(
  "/verify",
  adminValidator.retrieveUserValidator,
  validateRequest,
  adminController.verifyUser,
);

export default router;
