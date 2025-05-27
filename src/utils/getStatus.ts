import { WASocket } from "@whiskeysockets/baileys";
import Service from "../models/serviceModel";
import User from "../models/userModel";
import { formatPriceToIDR } from "./formatPrice";
export const getStatusService = async (
  socket: WASocket,
  pesan: string,
  remoteJid: string
) => {
  const parts = pesan.split(" ");
  if (parts.length === 2) {
    const [_, serviceId] = parts;

    if (!serviceId.trim()) {
      await sendErrorMessage(socket, remoteJid, "ServiceID tidak Valid");
      return;
    }

    try {
      // Gunakan serviceId sebagai string, jangan di-parse ke integer
      const service = await Service.findOne({ serviceId: serviceId.trim() });

      if (service) {
        const userNumber = remoteJid.split("@")[0];
        const user = await User.findOne({ number: userNumber });
        const formattedPrice = formatPriceToIDR(service.price);

        if (
          !(
            user &&
            (user.isAdmin || user.number.trim() === service.number.trim())
          )
        ) {
          await socket.sendMessage(remoteJid, {
            text: "Anda tidak memiliki izin untuk memeriksa status layanan ini.",
          });
        } else {
          await socket.sendMessage(remoteJid, {
            text: `*Data Servis*
\`\`\`
ServiceID       : ${service.serviceId}
Nama            : ${service.username}
Tipe Handphone  : ${service.modelType}
Tipe Servis     : ${service.serviceType}
Harga Servis    : ${formattedPrice}
Status          : ${service.status}
\`\`\``,
          });
        }
      } else {
        await socket.sendMessage(remoteJid, {
          text: `ServiceID ${serviceId} tidak ditemukan`,
        });
      }
    } catch (error) {
      console.error("Error saat mendapatkan status layanan:", error);
      await socket.sendMessage(remoteJid, {
        text: "Terjadi kesalahan saat mendapatkan status layanan. Silakan coba lagi.",
      });
    }
  }
};

const sendErrorMessage = async (
  socket: WASocket,
  remoteJid: string,
  message: string
) => {
  await socket.sendMessage(remoteJid, { text: message });
};
