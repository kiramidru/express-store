import express from "express";

import * as authController from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/auth", authController.auth);

export default router;
