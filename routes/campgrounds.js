import { Router } from "express";
import catchAsync from "../utils/catchAsync.js";
import campgrounds from "../controllers/campgrounds.js";
import { isLoggedIn, validateCampground, isAuthor } from "../middleware.js";
import multer from "multer";

import { storage } from "../cloudinary/index.js";

const router = Router();
const upload = multer({ storage });

router
  .route("/")
  .get(catchAsync(campgrounds.index))
  // .post(
  //   isLoggedIn,
  //   upload.array("image"),
  //   validateCampground,
  //   catchAsync(campgrounds.createCampground)
  // );
  .post(upload.array("image"), (req, res) => {
    console.log(req.body, req.files);
    res.send("IT WORKED!");
  });

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(campgrounds.showCampground))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.updateCampground)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

export default router;
