import User from "../models/userModel";

export const isAdmin = async (number: string): Promise<boolean> => {
  try {
    const user = await User.findOne({ number });
    return user?.isAdmin || false;
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};
