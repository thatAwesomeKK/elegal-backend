import { Router } from "express";
const router = Router();
import createFeedbackController from "../controllers/feedback/createFeedbackController.js";
import fetchFeedbackController from "../controllers/feedback/fetchFeedbackController.js";
import verifySession from "../middleware/verifySession.js";

router.post("/create", verifySession, createFeedbackController);
router.get("/fetch", fetchFeedbackController);

export default router;
