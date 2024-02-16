import { Router } from "express";
import {
  activateUser,
  loginUser,
  logoutUser,
  registrationUser,
} from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.route("/registration").post(registrationUser);

router.route("/activate-user").post(activateUser);

router.route("/login").post(loginUser);

router.route("/logout").get(isAuthenticated, logoutUser);

export default router;
