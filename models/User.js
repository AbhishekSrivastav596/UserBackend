import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    name: String,
    image: String
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
