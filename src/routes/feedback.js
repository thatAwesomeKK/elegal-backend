import { Router } from "express";
const router = Router();
import createFeedbackController from "../controllers/feedback/createFeedbackController.js";
import fetchFeedbackController from "../controllers/feedback/fetchFeedbackController.js";
import passportMiddleware from "../middleware/passportMiddleware.js";

router.post("/create", passportMiddleware, createFeedbackController);
router.get("/fetch", fetchFeedbackController);

export default router;
