import { Router } from "express";
const router = Router();
import createUserController from "../controllers/auth/createUserController.js";
import loginUserController from "../controllers/auth/loginUserController.js";
import updateUserController from "../controllers/auth/updateUserController.js";
import logoutController from "../controllers/auth/logoutController.js";

import passport from "passport";
import passportConfig from "../config/passportConfig.js";
import passportMiddleware from "../middleware/passportMiddleware.js";

passportConfig(passport);

//POST
router.post("/register", createUserController); //Register User /auth/register
router.post("/login", loginUserController); //Login user /auth/login

//PUT
router.put("/update", passportMiddleware, updateUserController); //Update the User Profile /auth/update

router.get("/logout", passportMiddleware, logoutController); //Logout the User /auth/logout

export default router;
