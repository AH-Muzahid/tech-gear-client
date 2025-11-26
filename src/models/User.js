import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
  },
  image: {
    type: String,
  },
}, { timestamps: true });

// if the model already exists, use it. Otherwise, create a new model.
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;