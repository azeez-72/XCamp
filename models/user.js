import pkg from "mongoose";
const { Schema: _Schema, model } = pkg;
const Schema = _Schema;

import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

UserSchema.plugin(passportLocalMongoose);

export default model("User", UserSchema);
