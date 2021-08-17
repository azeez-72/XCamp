import express, { urlencoded } from "express";
import Path from "path";
import Mongoose from "mongoose";
import ExpressError from "./utils/ExpressError.js";
import methodOverride from "method-override";
import campgroundRoutes from "./routes/campground.js";
import reviewRoutes from "./routes/review.js";
import ejsMate from "ejs-mate";

Mongoose.connect("mongodb://localhost:27017/xcamp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = Mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", "views");

app.use(urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.render("home");
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
