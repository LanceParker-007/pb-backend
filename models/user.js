import mongoose from "mongoose";

const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  score: {
    type: String,
    required: false,
  },
});

const User = new mongoose.model("User", schema);

export default User;
