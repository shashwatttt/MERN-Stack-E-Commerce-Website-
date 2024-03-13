//here we will make schema

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, //to remove all the whitespace
    },
    email: {
      type: String,
      required: true,
      unique: true, //with one mail only one user can be registered
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    address: {
      type: {},
      required: true,
    },
    role: {
      type: Number,
      default: 0, //false
    },
  },
  { timestamps: true }
); //the time is shown when new user will be created

export default mongoose.model("users", userSchema);
