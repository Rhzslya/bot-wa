import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  lastInteraction: {
    type: Date,
  },
});

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
