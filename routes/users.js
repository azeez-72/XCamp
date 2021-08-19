import { Router } from "express";
import users from "../controllers/users.js";
import catchAsync from "../utils/catchAsync.js";
import passport from "passport";

const router = Router();

router
  .route("/register")
  .get(users.renderRegister)
  .post(catchAsync(users.register));

router
  .route("/login")
  .get(users.renderLogin)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    users.login
  );

router.get("/logout", users.logout);

export default router;
