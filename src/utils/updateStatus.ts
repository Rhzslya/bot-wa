import { WASocket } from "@whiskeysockets/baileys";
import Service from "../models/serviceModel";
import User from "../models/userModel";
import { isValidationInt, isValidationIntWithZero } from "./validation";
import { statusMapping } from "./textMapping";

export const updateStatus = async (
  socket: WASocket,
  pesan: string,
  remoteJid: string
) => {
  const parts = pesan.split(" ");
  if (parts.length === 3) {
    const [_, serviceId, statusNumber] = parts;

    if (!isValidationInt(serviceId.trim())) {
      await sendErrorMessage(socket, remoteJid, "ServiceID tidak Valid");
      return;
    }

    if (!isValidationIntWithZero(statusNumber.trim())) {
      await sendErrorMessage(socket, remoteJid, "Status Number tidak Valid");
      return;
    }

    if (!(statusNumber in statusMapping)) {
      await socket.sendMessage(remoteJid, {
        text: "Status tidak valid. Gunakan 0 untuk Belum Selesai dan 1 untuk Selesai.",
      });
      return;
    }

    try {
      const service = await Service.findOne({
        serviceId: serviceId.trim(),
      });

      if (service) {
        const userNumber = remoteJid.split("@")[0];
        const user = await User.findOne({ number: userNumber });

        if (!user || !user.isAdmin) {
          await socket.sendMessage(remoteJid, {
            text: "Anda tidak memiliki izin untuk menggunakan layanan ini.",
          });
        } else {
          service.status = statusMapping[statusNumber];
          service.updatedAt = new Date();
          await service.save();

          await socket.sendMessage(remoteJid, {
            text: `Status untuk ServiceID ${serviceId} telah diperbarui menjadi "${service.status}"`,
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
  } else {
    await socket.sendMessage(remoteJid, {
      text: "Format pesan tidak valid. Gunakan format: '-serviceId-statusNumber'.",
    });
  }
};

const sendErrorMessage = async (
  socket: WASocket,
  remoteJid: string,
  message: string
) => {
  await socket.sendMessage(remoteJid, { text: message });
};
