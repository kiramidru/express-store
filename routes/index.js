import express from "express";

import auth from "./auth.route.js";
import admin from "./admin.route.js";
import seller from "./seller.route.js";
import customer from "./customer.route.js";

const router = express.Router();

router.use("/", auth);
router.use("/admin", admin);
router.use("/seller", seller);
router.use("/customer", customer);

export default router;
