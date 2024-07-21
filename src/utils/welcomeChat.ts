import { WASocket } from "@whiskeysockets/baileys";
import User from "../models/userModel";

const WELCOME_MESSAGE_INTERVAL = 24 * 60 * 60 * 1000;
export const welcomeChat = async (
  socket: WASocket,
  remoteJid: string,
  pushName: string,
  number: string
) => {
  const user = await User.findOne({ id: remoteJid });
  const now = Date.now();

  if (!user) {
    await User.findOneAndUpdate(
      { id: remoteJid },
      { username: pushName, number: number, lastInteraction: now },
      { upsert: true, new: true }
    );

    await socket.sendMessage(remoteJid, {
      text: `Halo, ${pushName}!\n\n🔅   Selamat Datang di Sinari Cell!   🔅\n\nKami menyediakan berbagai layanan perbaikan dan aksesori ponsel berkualitas. Jangan ragu untuk bertanya tentang layanan kami atau jika Anda membutuhkan bantuan lebih lanjut.\n\n✨Ada yang bisa kami bantu hari ini?✨\n\nJika Anda memerlukan bantuan penggunaan bot ini, ketik "!help" untuk informasi lebih lanjut.`,
    });
  } else {
    const lastInteraction = user.lastInteraction || 0;

    if (now - lastInteraction > WELCOME_MESSAGE_INTERVAL) {
      await socket.sendMessage(remoteJid, {
        text: `Halo, ${pushName}!\n\n🔅   Selamat Datang Kembali di Sinari Cell!   🔅\n\nKami menyediakan berbagai layanan perbaikan dan aksesori ponsel berkualitas. Jangan ragu untuk bertanya tentang layanan kami atau jika Anda membutuhkan bantuan lebih lanjut.\n\n✨Ada yang bisa kami bantu hari ini?✨\n\nJika Anda memerlukan bantuan penggunaan bot ini, ketik "!help" untuk informasi lebih lanjut.`,
      });
    }

    await User.findOneAndUpdate(
      { id: remoteJid },
      { username: pushName, number: number, lastInteraction: now },
      { new: true }
    );
  }
};
