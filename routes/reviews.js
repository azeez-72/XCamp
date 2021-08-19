import { Router } from "express";
import catchAsync from "../utils/catchAsync.js";
import reviews from "../controllers/reviews.js";
import { validateReview, isLoggedIn, isReviewAuthor } from "../middleware.js";

const router = Router({ mergeParams: true });

router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);

export default router;
