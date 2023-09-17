import { Router } from "express";
const router = Router();
import fetchUserController from "../controllers/auth/fetchUserController.js";
import updateUserController from "../controllers/auth/updateUserController.js";
import fetchProfileMinimumController from "../controllers/auth/fetchProfileMinimumController.js";
import passportMiddleware from "../middleware/passportMiddleware.js";

router.get("/fetch-min", passportMiddleware, fetchProfileMinimumController); //Logout the User /auth/logout

router.get("/", passportMiddleware, fetchUserController); //Logout the User /auth/logout

router.post("/update", passportMiddleware, updateUserController); //Logout the User /auth/logout

export default router;
