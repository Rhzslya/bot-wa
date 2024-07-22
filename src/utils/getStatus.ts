import { WASocket } from "@whiskeysockets/baileys";
import Service from "../models/serviceModel";
import User from "../models/userModel";
import { formatPriceToIDR } from "./formatPrice";
import { isValidationInt } from "./validation";
export const getStatusService = async (
  socket: WASocket,
  pesan: string,
  remoteJid: string
) => {
  const parts = pesan.split(" ");
  if (parts.length === 2) {
    const [_, serviceId] = parts;

    if (!isValidationInt(serviceId.trim())) {
      await sendErrorMessage(socket, remoteJid, "ServiceID tidak Valid");
      return;
    }

    try {
      const service = await Service.findOne({
        serviceId: parseInt(serviceId, 10),
      });

      if (service) {
        const userNumber = remoteJid.split("@")[0];

        // Verifikasi apakah nomor telepon pengirim pesan sama dengan nomor telepon yang terkait dengan layanan ini
        const user = await User.findOne({ number: userNumber });

        // Format harga sebagai IDR
        const formattedPrice = formatPriceToIDR(service.price);

        if (!(user && (user.isAdmin || user.number === service.number))) {
          // Jika nomor telepon tidak sesuai atau tidak ditemukan
          await socket.sendMessage(remoteJid, {
            text:
              "Anda tidak memiliki izin untuk memeriksa status layanan ini.",
          });
        } else {
          await socket.sendMessage(remoteJid, {
            text: `ServiceID : ${service.serviceId}\nNama : ${service.username}\nTipe Handphone : ${service.modelType}\nTipe Servis : ${service.serviceType}\nHarga Servis : ${formattedPrice}\nStatus : ${service.status}`,
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
        text:
          "Terjadi kesalahan saat mendapatkan status layanan. Silakan coba lagi.",
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
