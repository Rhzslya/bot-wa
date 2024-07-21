import { WASocket } from "@whiskeysockets/baileys";
import Service from "../models/serviceModel";
import { convertNumber } from "./ConvertNumber";
import { validationNumber, isValidString, isValidationInt } from "./Validation";
import { capitalizeFirst } from "./capitalizeFirst";
import { getNextSequenceValue } from "./getNextSequenceValue";
import User from "../models/userModel";
export const handleAddCommand = async (
  socket: WASocket,
  pesan: string,
  remoteJid: string
) => {
  const parts = pesan.split("\n");
  if (parts.length === 6) {
    const [_, username, phoneNumber, modelType, serviceType, price] = parts;

    if (!isValidString(username.trim())) {
      await sendErrorMessage(
        socket,
        remoteJid,
        "Username tidak valid. Username tidak boleh mengandung angka."
      );
      return;
    }

    if (!isValidString(serviceType.trim())) {
      await sendErrorMessage(
        socket,
        remoteJid,
        "Tipe Servis tidak Valid. Tipe Servis tidak boleh mengandung angka"
      );
      return;
    }

    if (!validationNumber(phoneNumber.trim())) {
      await sendErrorMessage(
        socket,
        remoteJid,
        "Nomor telepon tidak valid. Harap masukkan nomor yang benar."
      );
      return;
    }

    if (!isValidationInt(price.trim())) {
      await sendErrorMessage(
        socket,
        remoteJid,
        "Harga tidak valid. Harap masukkan angka yang benar dan positif."
      );
      return;
    }
    try {
      const userNumber = remoteJid.split("@")[0];
      const user = await User.findOne({ number: userNumber });
      const serviceIdCounter = await getNextSequenceValue("serviceId");

      if (!user || !user.isAdmin) {
        await socket.sendMessage(remoteJid, {
          text: "Anda tidak memiliki izin untuk menggunakan layanan ini.",
        });
      } else {
        const service = new Service({
          username: capitalizeFirst(username),
          number: convertNumber(phoneNumber),
          serviceType: capitalizeFirst(serviceType),
          modelType: capitalizeFirst(modelType),
          price: parseInt(price, 10),
          serviceId: `${serviceIdCounter}${parseInt(phoneNumber.slice(-3))}`, // Unique identifier
        });

        await service.save();
        await socket.sendMessage(remoteJid, {
          text: `Data Tersimpan dengan ServiceID: ${service.serviceId}`,
        });
      }
    } catch (error) {
      console.error("Error saat menyimpan data:", error);
      await sendErrorMessage(
        socket,
        remoteJid,
        "Terjadi kesalahan saat menyimpan data. Silakan coba lagi."
      );
    }
  } else {
    await sendErrorMessage(
      socket,
      remoteJid,
      "Format data tidak valid. Harap gunakan format:\n!add\nNama\nNo Hp\nTipe Handphone\nTipe Servis\nHarga"
    );
  }
};

const sendErrorMessage = async (
  socket: WASocket,
  remoteJid: string,
  message: string
) => {
  await socket.sendMessage(remoteJid, { text: message });
};
