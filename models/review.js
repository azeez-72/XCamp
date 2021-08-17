import pkg from "mongoose";
const { Schema: _Schema, model } = pkg;
const Schema = _Schema;

const reviewSchema = new Schema({
  body: String,
  rating: Number,
});

export default model("Review", reviewSchema);
