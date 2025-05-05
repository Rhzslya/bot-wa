import { WASocket } from "@whiskeysockets/baileys";
import User, { IUser } from "../models/userModel"; // Pastikan `IUser` didefinisikan di model
import { helloText } from "./textMessage";

const WELCOME_MESSAGE_INTERVAL = 24 * 60 * 60 * 1000; // 24 jam dalam milidetik

export const welcomeChat = async (
  socket: WASocket,
  remoteJid: string,
  pushName: string,
  number: string
) => {
  const now = Date.now();

  // Cari user di database
  const user: IUser | null = await User.findOne({
    id: remoteJid,
  }).lean<IUser>();

  let welcomeMessage = "";

  if (!user) {
    // User baru, kirim pesan welcome pertama kali
    welcomeMessage = helloText(pushName);
  } else {
    const lastInteraction = user.lastInteraction
      ? new Date(user.lastInteraction).getTime()
      : 0;

    if (now - lastInteraction > WELCOME_MESSAGE_INTERVAL) {
      // Jika user sudah ada tapi sudah lebih dari 24 jam
      welcomeMessage = helloText(pushName);
    }
  }

  // Kirim welcome chat jika ada pesan yang harus dikirim
  if (welcomeMessage) {
    await socket.sendMessage(remoteJid, { text: welcomeMessage });
  }

  // Simpan atau perbarui user di database (dilakukan sekali di akhir)
  await User.findOneAndUpdate(
    { id: remoteJid },
    { username: pushName, number: number, lastInteraction: now },
    { upsert: true, new: true }
  );
};
