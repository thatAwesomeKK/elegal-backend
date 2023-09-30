import { Router } from "express";
const router = Router();
import fetchUserController from "../controllers/profile/fetchUserController.js";
import updateUserController from "../controllers/profile/updateUserController.js";
import fetchProfileMinimumController from "../controllers/profile/fetchProfileMinimumController.js";
import verifySession from "../middleware/verifySession.js";
import rateServiceController from "../controllers/profile/rateServiceController.js";

router.get("/fetch-min", verifySession, fetchProfileMinimumController);

router.get("/", verifySession, fetchUserController);

router.post("/update", verifySession, updateUserController);

router.post("/rate-service", verifySession, rateServiceController);

export default router;
