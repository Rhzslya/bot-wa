import { WASocket } from "@whiskeysockets/baileys";
import User, { IUser } from "../models/userModel";
import { helloText } from "./textMessage";

const WELCOME_MESSAGE_INTERVAL = 24 * 60 * 60 * 1000;

export const welcomeChat = async (
  socket: WASocket,
  remoteJid: string,
  pushName: string,
  number: string
) => {
  const now = Date.now();

  const user: IUser | null = await User.findOne({
    id: remoteJid,
  }).lean<IUser>();

  let welcomeMessage = "";

  if (!user) {
    welcomeMessage = helloText(pushName);
  } else {
    const lastInteraction = user.lastInteraction
      ? new Date(user.lastInteraction).getTime()
      : 0;

    if (now - lastInteraction > WELCOME_MESSAGE_INTERVAL) {
      welcomeMessage = helloText(pushName);
    }
  }

  if (welcomeMessage) {
    await socket.sendMessage(remoteJid, { text: welcomeMessage });
  }

  await User.findOneAndUpdate(
    { id: remoteJid },
    { username: pushName, number: number, lastInteraction: now },
    { upsert: true, new: true }
  );
};
