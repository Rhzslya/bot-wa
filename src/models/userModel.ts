import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  id: string;
  username: string;
  number: string;
  isAdmin?: boolean;
  lastInteraction?: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  number: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  lastInteraction: { type: Date },
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
