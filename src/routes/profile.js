import { Router } from "express";
const router = Router();
import fetchUserController from "../controllers/auth/fetchUserController.js";
import updateUserController from "../controllers/auth/updateUserController.js";
import fetchProfileMinimumController from "../controllers/auth/fetchProfileMinimumController.js";
import verifySession from "../middleware/verifySession.js";

router.get("/fetch-min", verifySession, fetchProfileMinimumController); //Logout the User /auth/logout

router.get("/", verifySession, fetchUserController); //Logout the User /auth/logout

router.post("/update", verifySession, updateUserController); //Logout the User /auth/logout

export default router;
