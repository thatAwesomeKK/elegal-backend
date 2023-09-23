import { Router } from "express";
const router = Router();
import createUserController from "../controllers/auth/createUserController.js";
import loginUserController from "../controllers/auth/loginUserController.js";
import updateUserController from "../controllers/auth/updateUserController.js";
import logoutController from "../controllers/auth/logoutController.js";
import verifyEmailController from "../controllers/auth/verifyEmailController.js";
import {
  verifyConfirmEmailToken,
  verifyForgotPassToken,
} from "../middleware/jwtVerify.js";
import forgotPasswordController from "../controllers/auth/forgotPasswordController.js";
import changePasswordController from "../controllers/auth/changePasswordController.js";
import verifySession from "../middleware/verifySession.js";

//POST
router.post("/register", createUserController); //Register User /auth/register
router.post("/login", loginUserController); //Login user /auth/login
router.get("/verify-email", verifyConfirmEmailToken, verifyEmailController);
router.post("/forgot-password", forgotPasswordController);
router.post(
  "/change-password",
  verifyForgotPassToken,
  changePasswordController
);

//PUT
router.put("/update", verifySession, updateUserController); //Update the User Profile /auth/update

router.get("/logout", verifySession, logoutController); //Logout the User /auth/logout

export default router;
