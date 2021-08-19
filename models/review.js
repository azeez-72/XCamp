import pkg from "mongoose";
const { Schema: _Schema, model } = pkg;
const Schema = _Schema;

const reviewSchema = new Schema({
  body: String,
  rating: Number,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export default model("Review", reviewSchema);
