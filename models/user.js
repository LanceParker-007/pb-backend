import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,

    unique: true,
  },
  mobilenumber: {
    type: String,
    required: true,
    unique: true,
  },
  score: {
    type: String,
    required: false,
  },
});

const User = new mongoose.model("user", schema);

export default User;
