import { Router } from "express";
import * as controller from "../controllers/appController";
import Auth, { localVariable } from "../middleware/auth";
import { registerMail } from "../controllers/mailer";

const router = Router();

router.route("/register").post(controller.register);
router.route("/register-mail").post(registerMail);
router.route("/authenticate").post((req, res) => {
  res.end();
});
router.route("/login").post(controller.verifyUser, controller.login);

router.route("/user/:username").get(controller.getUser);
router
  .route("/generate-otp")
  .get(controller.verifyUser, localVariable, controller.generateOTP);
router.route("/verify-otp").get(controller.verifyOTP);
router.route("/reset-session").get(controller.resetSession);

router.route("/user").put(Auth, controller.updateUser);
router
  .route("/reset-password")
  .put(controller.verifyUser, controller.resetPassword);

export default router;
