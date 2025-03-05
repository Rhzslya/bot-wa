import { WASocket } from "@whiskeysockets/baileys";
import User, { IUser } from "../models/userModel"; // Pastikan `IUser` didefinisikan di model

const WELCOME_MESSAGE_INTERVAL = 24 * 60 * 60 * 1000; // 24 jam dalam milidetik

export const welcomeChat = async (
  socket: WASocket,
  remoteJid: string,
  pushName: string,
  number: string
) => {
  const now = Date.now();

  // Cari user di database dengan tipe eksplisit
  const user: IUser | null = await User.findOne({
    id: remoteJid,
  }).lean<IUser>();

  if (!user) {
    // Jika user belum ada, buat user baru
    await User.findOneAndUpdate(
      { id: remoteJid },
      {
        username: pushName,
        number: number,
        lastInteraction: now, // Simpan sebagai timestamp (angka)
      },
      { upsert: true, new: true }
    );

    await socket.sendMessage(remoteJid, {
      text: `Halo, ${pushName}!\n\n🔅   Selamat Datang di Sinari Cell!   🔅\n\nKami menyediakan berbagai layanan perbaikan dan aksesori ponsel berkualitas. Jangan ragu untuk bertanya tentang layanan kami atau jika Anda membutuhkan bantuan lebih lanjut.\n\n✨Ada yang bisa kami bantu hari ini?✨\n\nJika Anda memerlukan bantuan penggunaan bot ini, ketik "!help" untuk informasi lebih lanjut.`,
    });
  } else {
    const lastInteraction = user.lastInteraction
      ? new Date(user.lastInteraction).getTime()
      : 0;

    // Jika terakhir berinteraksi lebih dari 24 jam yang lalu, kirim pesan sambutan lagi
    if (now - lastInteraction > WELCOME_MESSAGE_INTERVAL) {
      await socket.sendMessage(remoteJid, {
        text: `Halo, ${pushName}!\n\n🔅   Selamat Datang Kembali di Sinari Cell!   🔅\n\nKami menyediakan berbagai layanan perbaikan dan aksesori ponsel berkualitas. Jangan ragu untuk bertanya tentang layanan kami atau jika Anda membutuhkan bantuan lebih lanjut.\n\n✨Ada yang bisa kami bantu hari ini?✨\n\nJika Anda memerlukan bantuan penggunaan bot ini, ketik "!help" untuk informasi lebih lanjut.`,
      });
    }

    // Perbarui informasi user di database
    await User.findOneAndUpdate(
      { id: remoteJid },
      { username: pushName, number: number, lastInteraction: now },
      { new: true }
    );
  }
};
