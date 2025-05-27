import { WASocket } from "@whiskeysockets/baileys";
import { isAdmin } from "./userHelper";
import Products from "../models/productSchema";
import { confirmationDeleteProduct, validProviders } from "./textMessage";
import { isValidationInt, isValidProductId } from "./validation";
import { capitalizeFirst } from "./capitalizeFirst";

export const addProduct = async (
  socket: WASocket,
  pesan: string,
  remoteJid: string
) => {
  const parts = pesan.split("\n");

  if (parts.length > 6) {
    const [_, productId, provider, type, sellPrice, basePrice, ...descArr] =
      parts;
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
        `*Provider tidak valid.* Gunakan salah satu dari:\n ${validProviders
          .map((p, index) => `${index + 1}. *${capitalizeFirst(p)}*`)
          .join(`\n `)}.`
      );
      return;
    }

    if (!["pulsa", "internet"].includes(lowerType)) {
      await sendErrorMessage(
        socket,
        remoteJid,
        "*Tipe produk* harus _pulsa_ atau _internet_."
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

    if (!isValidationInt(basePrice.trim())) {
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
        basePrice: Number(basePrice),
        description,
      });

      await newProduct.save();
      await socket.sendMessage(remoteJid, {
        text: `Produk *${productId.toUpperCase()}* berhasil ditambahkan!`,
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
          "*Terjadi kesalahan* saat menyimpan produk. _Silakan coba lagi nanti._"
        );
      }
    }
  } else {
    await sendErrorMessage(
      socket,
      remoteJid,
      `*Format data tidak valid.*
Harap gunakan format berikut
\`\`\`
!add_product
ID Produk
Provider (Telkomsel/Axis/dll)
Tipe Produk (pulsa/internet)
Harga Jual
Harga Modal
Deskripsi
\`\`\``
    );
    return;

    return;
  }
};

const deleteSessions = new Map();

export const deleteProduct = async (
  socket: WASocket,
  pesan: string,
  remoteJid: string
) => {
  const parts = pesan.trim().split(" ");
  if (parts.length !== 2) {
    await sendErrorMessage(
      socket,
      remoteJid,
      "Format : ```!delete <ID Produk>```"
    );
    return;
  }

  const productId = parts[1].toUpperCase();
  const userNumber = remoteJid.split("@")[0];

  if (!(await isAdmin(userNumber))) {
    await sendErrorMessage(
      socket,
      remoteJid,
      "Anda tidak punya izin untuk menggunakan layanan ini."
    );
    return;
  }

  const product = await Products.findOne({ productId });
  if (!product) {
    await sendErrorMessage(
      socket,
      remoteJid,
      `Produk ${productId} tidak ditemukan.`
    );
    return;
  }

  deleteSessions.set(remoteJid, productId);

  await socket.sendMessage(remoteJid, {
    text: confirmationDeleteProduct({
      productId: product.productId,
      provider: product.provider,
      productType: product.type,
      price: product.sellPrice,
      basePrice: product.basePrice,
      description: product.description,
    }),
  });

  setTimeout(() => {
    if (deleteSessions.has(remoteJid)) {
      deleteSessions.delete(remoteJid);
      socket.sendMessage(remoteJid, { text: "Waktu habis. Dibatalkan." });
    }
  }, 30000);
};

export const handleDeleteConfirmation = async (
  socket: WASocket,
  pesan: string,
  remoteJid: string
) => {
  if (!deleteSessions.has(remoteJid)) return;

  const productId = deleteSessions.get(remoteJid);
  if (pesan === "y") {
    const success = await removeProduct(productId);
    if (success) {
      await socket.sendMessage(remoteJid, {
        text: `Produk *${productId}* berhasil dihapus!`,
      });
    } else {
      await socket.sendMessage(remoteJid, {
        text: "Gagal menghapus produk!",
      });
    }
  } else if (pesan === "n") {
    await socket.sendMessage(remoteJid, {
      text: "Penghapusan dibatalkan.",
    });
  }

  deleteSessions.delete(remoteJid);
};

export const removeProduct = async (productId: string): Promise<boolean> => {
  try {
    const result = await Products.deleteOne({ productId });

    if (result.deletedCount > 0) {
      console.log(`Produk ${productId} berhasil dihapus.`);
      return true;
    } else {
      console.log(`Produk ${productId} tidak ditemukan.`);
      return false;
    }
  } catch (error) {
    console.error("Error saat menghapus produk:", error);
    return false;
  }
};

const sendErrorMessage = async (
  socket: WASocket,
  remoteJid: string,
  message: string
) => {
  await socket.sendMessage(remoteJid, { text: message });
};
