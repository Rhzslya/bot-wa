import { WASocket } from "@whiskeysockets/baileys";
import { helpMessageForCustomer, helpMessageForAdmin } from "./textMessage";
import User from "../models/userModel";
export const helperChat = async (socket: WASocket, remoteJid: string) => {
  try {
    const userNumber = remoteJid.split("@")[0];
    const user = await User.findOne({ number: userNumber });

    if (!user || !user.isAdmin) {
      await socket.sendMessage(remoteJid, {
        text: helpMessageForCustomer,
      });
    } else {
      await socket.sendMessage(remoteJid, {
        text: helpMessageForAdmin,
      });
    }
  } catch (error) {
    console.error("Error saat mendapatkan status layanan:", error);
    await socket.sendMessage(remoteJid, {
      text:
        "Terjadi kesalahan saat mendapatkan status layanan. Silakan coba lagi.",
    });
  }
};
