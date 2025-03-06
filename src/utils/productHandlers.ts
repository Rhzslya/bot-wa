import { WASocket } from "@whiskeysockets/baileys";
import { isAdmin } from "./userHelper";
import Products from "../models/productSchema";
import { validProviders } from "./textMessage";
import { isValidationInt, isValidProductId } from "./validation";

export const addProduct = async (
  socket: WASocket,
  pesan: string,
  remoteJid: string
) => {
  const parts = pesan.split("\n");

  if (parts.length > 5) {
    const [_, productId, provider, type, sellPrice, ...descArr] = parts;
    const number = remoteJid.split("@")[0];
    const isUserAdmin = await isAdmin(number);
    const description = descArr.join(" ").trim();
    const lowerType = type.trim().toLowerCase();
    const formattedProvider = provider.trim().toLowerCase();

    if (!isUserAdmin) {
      await sendErrorMessage(
        socket,
        remoteJid,
        "*Anda tidak memiliki izin untuk menambahkan produk.*"
      );
      return;
    }

    if (!isValidProductId(productId)) {
      await sendErrorMessage(
        socket,
        remoteJid,
        "*ID Produk* hanya boleh berisi *huruf* dan *angka*, tanpa *simbol* atau *spasi*."
      );
      return;
    }

    if (!validProviders.includes(formattedProvider)) {
      await sendErrorMessage(
        socket,
        remoteJid,
        `*Provider tidak valid.* Gunakan salah satu dari: ${validProviders
          .map((p) => `*${p}*`)
          .join(", ")}.`
      );
      return;
    }

    if (!["pulsa", "paket internet"].includes(lowerType)) {
      await sendErrorMessage(
        socket,
        remoteJid,
        "*Tipe produk* harus _pulsa_ atau _paket internet_."
      );
      return;
    }

    if (!isValidationInt(sellPrice.trim())) {
      await sendErrorMessage(
        socket,
        remoteJid,
        "*Harga* harus berupa *angka positif*."
      );
      return;
    }

    if (!description) {
      await sendErrorMessage(socket, remoteJid, "*Deskripsi* wajib diisi.");
      return;
    }

    try {
      const newProduct = new Products({
        productId: productId.toUpperCase(),
        provider: formattedProvider,
        type: lowerType,
        sellPrice: Number(sellPrice),
        description,
      });

      await newProduct.save();
      await socket.sendMessage(remoteJid, {
        text: `Produk *${productId.toUpperCase()}* berhasil ditambahkan! 🎉`,
      });
    } catch (error: any) {
      if (error.code === 11000) {
        await sendErrorMessage(
          socket,
          remoteJid,
          `Produk dengan *ID ${productId.toUpperCase()}* sudah ada. Gunakan ID lain atau periksa kembali daftar produk.`
        );
      } else {
        console.error("Error saat menyimpan data produk:", error);
        await sendErrorMessage(
          socket,
          remoteJid,
          "⚠️ *Terjadi kesalahan* saat menyimpan produk. _Silakan coba lagi nanti._"
        );
      }
    }
  } else {
    await sendErrorMessage(
      socket,
      remoteJid,
      "❌ *Format data tidak valid.*\n\nHarap gunakan format berikut:\n\n```!product\nID Produk\nProvider (Telkomsel/Axis/dll)\nTipe Produk (pulsa/paket internet)\nHarga Jual\nDeskripsi```"
    );
    return;
  }
};

const sendErrorMessage = async (
  socket: WASocket,
  remoteJid: string,
  message: string
) => {
  await socket.sendMessage(remoteJid, { text: message });
};
