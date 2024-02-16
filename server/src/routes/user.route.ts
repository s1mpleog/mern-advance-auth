import { Router } from "express";
import {
  activateUser,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  updateAccessToken,
} from "../controllers/user.controller";
import {
  authorizeRoles,
  isAuthenticated,
} from "../middlewares/auth.middleware";

const router = Router();

router.route("/registration").post(registrationUser);

router.route("/activate-user").post(activateUser);

router.route("/login").post(loginUser);

router
  .route("/logout")
  .get(isAuthenticated, authorizeRoles("admin"), logoutUser);

router.route("/refresh").get(updateAccessToken);
router.route("/me").get(isAuthenticated, getUserInfo);

export default router;
