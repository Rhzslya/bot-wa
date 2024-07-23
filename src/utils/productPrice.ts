import { WASocket } from "@whiskeysockets/baileys";
import { productPriceMapping } from "./textMapping";
export const checkProductPrice = async (
  socket: WASocket,
  pesan: string,
  remoteJid: string
) => {
  const parts = pesan.split(" ");
  if (parts.length === 2) {
    const [_, productCode] = parts;

    if (!(productCode in productPriceMapping)) {
      await socket.sendMessage(remoteJid, {
        text:
          "Status tidak valid. Gunakan 0 untuk Belum Selesai dan 1 untuk Selesai.",
      });
      return;
    }
    try {
      await socket.sendMessage(remoteJid, {
        text: productPriceMapping[productCode],
      });
    } catch (error) {
      console.error("Error saat mendapatkan status layanan:", error);
      await socket.sendMessage(remoteJid, {
        text:
          "Terjadi kesalahan saat mendapatkan status layanan. Silakan coba lagi.",
      });
    }
  } else {
    await socket.sendMessage(remoteJid, {
      text: `Format Tidak Valid, mohon untuk menggunakan Format yang sesuai\nContoh Format : "!harga(spasi)indosat"`,
    });
  }
};
