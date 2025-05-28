import { WASocket } from "@whiskeysockets/baileys";
import { isAdmin } from "./userHelper";
import Products from "../models/productSchema";
import {
  bankProviders,
  confirmationDeleteProduct,
  eWalletProviders,
  listrikProviders,
  pulsaInternetProviders,
  validProviders,
  validProvidersWithFee,
} from "./textMessage";
import { isValidationInt, isValidProductId } from "./validation";
import { capitalizeFirst } from "./capitalizeFirst";
import { formatPriceToIDR } from "./formatPrice";

export const addProduct = async (
  socket: WASocket,
  pesan: string,
  remoteJid: string
) => {
  const parts = pesan.split("\n");

  if (parts.length > 6) {
    const [_, productId, provider, type, basePrice, sellPrice, ...descArr] =
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

    if (!["pulsa", "internet", "listrik"].includes(lowerType)) {
      await sendErrorMessage(
        socket,
        remoteJid,
        "*Tipe produk* harus berupa <pulsa>, <internet> atau <listirk>."
      );
      return;
    }

    if (
      pulsaInternetProviders.includes(formattedProvider) &&
      !["pulsa", "internet"].includes(lowerType)
    ) {
      await sendErrorMessage(
        socket,
        remoteJid,
        `Untuk *Provider ${capitalizeFirst(
          formattedProvider
        )}*, tipe produk harus <pulsa> atau <internet>.`
      );
      return;
    }

    if (
      listrikProviders.includes(formattedProvider) &&
      lowerType !== "listrik"
    ) {
      await sendErrorMessage(
        socket,
        remoteJid,
        `Untuk *Provider ${formattedProvider.toUpperCase()}*, tipe produk harus *listrik*.`
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
Harga Modal
Harga Jual
Deskripsi
\`\`\``
    );
    return;
  }
};
export const addFeeProduct = async (
  socket: WASocket,
  pesan: string,
  remoteJid: string
) => {
  const parts = pesan.split("\n");

  if (parts.length > 7) {
    const [_, productId, provider, type, minPrice, maxPrice, fee, ...descArr] =
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

    if (!validProvidersWithFee.includes(formattedProvider)) {
      await sendErrorMessage(
        socket,
        remoteJid,
        `*Provider tidak valid.* Gunakan salah satu dari:\n ${validProvidersWithFee
          .map((p, index) => `${index + 1}. *${capitalizeFirst(p)}*`)
          .join(`\n `)}.`
      );
      return;
    }

    if (!["e-wallet", "bank"].includes(lowerType)) {
      await sendErrorMessage(
        socket,
        remoteJid,
        "*Tipe produk* harus berupa <e-wallet> atau <bank>."
      );
      return;
    }

    if (
      eWalletProviders.includes(formattedProvider) &&
      lowerType !== "e-wallet"
    ) {
      await sendErrorMessage(
        socket,
        remoteJid,
        `Untuk *Provider ${capitalizeFirst(
          formattedProvider
        )}*, tipe produk harus *e-wallet*.`
      );
      return;
    }

    if (bankProviders.includes(formattedProvider) && lowerType !== "bank") {
      await sendErrorMessage(
        socket,
        remoteJid,
        `Untuk *Provider ${capitalizeFirst(
          formattedProvider
        )}*, tipe produk harus *bank*.`
      );
      return;
    }

    if (!isValidationInt(minPrice.trim())) {
      await sendErrorMessage(
        socket,
        remoteJid,
        "*Harga Min* harus berupa *angka positif*."
      );
      return;
    }

    if (!isValidationInt(maxPrice.trim())) {
      await sendErrorMessage(
        socket,
        remoteJid,
        "*Harga Max* harus berupa *angka positif*."
      );
      return;
    }

    if (!isValidationInt(fee.trim())) {
      await sendErrorMessage(
        socket,
        remoteJid,
        "*Fee* harus berupa *angka positif*."
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
        minPrice: Number(minPrice),
        maxPrice: Number(maxPrice),
        fee: Number(fee),
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
!add_fee_product
ID Produk
Provider (Dana/OVO/BRI/etc)
Tipe Produk (e-wallet/bank)
Harga Min
Harga Maks
Fee
Deskripsi
\`\`\``
    );
    return;
  }
};

export const updateProduct = async (
  socket: WASocket,
  pesan: string,
  remoteJid: string
) => {
  const parts = pesan.split("\n");

  if (parts.length > 3) {
    const [_, productId, sellPrice, ...descArr] = parts;
    const number = remoteJid.split("@")[0];
    const isUserAdmin = await isAdmin(number);
    const description = descArr.join(" ").trim();

    if (!isUserAdmin) {
      await sendErrorMessage(
        socket,
        remoteJid,
        "*Anda tidak memiliki izin untuk mengupdate produk.*"
      );
      return;
    }

    if (!isValidationInt(sellPrice.trim())) {
      await sendErrorMessage(
        socket,
        remoteJid,
        "*Harga Jual* harus berupa *angka positif*."
      );
      return;
    }

    if (!description) {
      await sendErrorMessage(socket, remoteJid, "*Deskripsi* wajib diisi.");
      return;
    }

    try {
      const product = await Products.findOne({
        productId: productId.toUpperCase(),
      });

      if (!product) {
        await sendErrorMessage(
          socket,
          remoteJid,
          `Produk dengan ID *${productId.toUpperCase()}* tidak ditemukan.`
        );
        return;
      }

      if (
        product.type !== "pulsa" &&
        product.type !== "internet" &&
        product.type !== "listrik"
      ) {
        await sendErrorMessage(
          socket,
          remoteJid,
          `Tipe produk *${product.type}* tidak dapat diupdate dengan perintah ini.`
        );
        return;
      }

      product.sellPrice = Number(sellPrice);
      product.description = description;

      await product.save();

      await socket.sendMessage(remoteJid, {
        text: `Produk *${productId.toUpperCase()}* berhasil diperbarui!\n\nHarga Jual: *${sellPrice}`,
      });
    } catch (error) {
      console.error("Error saat mengupdate data produk:", error);
      console.log(productId);
      await sendErrorMessage(
        socket,
        remoteJid,
        "*Terjadi kesalahan* saat mengupdate produk. _Silakan coba lagi nanti._"
      );
    }
  } else {
    await sendErrorMessage(
      socket,
      remoteJid,
      `*Format data tidak valid.*
Harap gunakan format berikut
\`\`\`
!update_product
IDProduk
Harga Jual Baru
Deskripsi
\`\`\``
    );
    return;
  }
};

export const updateFeeProduct = async (
  socket: WASocket,
  pesan: string,
  remoteJid: string
) => {
  const parts = pesan.split("\n");

  if (parts.length === 5) {
    const [_, productId, minPrice, maxPrice, fee] = parts;
    const number = remoteJid.split("@")[0];
    const isUserAdmin = await isAdmin(number);

    if (!isUserAdmin) {
      await sendErrorMessage(
        socket,
        remoteJid,
        "*Anda tidak memiliki izin untuk mengupdate produk.*"
      );
      return;
    }

    if (!isValidationInt(minPrice.trim())) {
      await sendErrorMessage(
        socket,
        remoteJid,
        "*Harga Min* harus berupa *angka positif*."
      );
      return;
    }

    if (!isValidationInt(maxPrice.trim())) {
      await sendErrorMessage(
        socket,
        remoteJid,
        "*Harga Max* harus berupa *angka positif*."
      );
      return;
    }

    if (!isValidationInt(fee.trim())) {
      await sendErrorMessage(
        socket,
        remoteJid,
        "*Fee* harus berupa *angka positif*."
      );
      return;
    }

    try {
      const product = await Products.findOne({
        productId: productId.toUpperCase(),
      });

      if (!product) {
        await sendErrorMessage(
          socket,
          remoteJid,
          `Produk dengan ID *${productId.toUpperCase()}* tidak ditemukan.`
        );
        return;
      }

      if (product.type !== "e-wallet" && product.type !== "bank") {
        await sendErrorMessage(
          socket,
          remoteJid,
          `Tipe produk *${product.type}* tidak dapat diupdate dengan perintah ini.`
        );
        return;
      }

      product.minPrice = Number(minPrice);
      product.maxPrice = Number(maxPrice);
      product.fee = Number(fee);

      await product.save();

      await socket.sendMessage(remoteJid, {
        text: `Produk *${productId.toUpperCase()}* berhasil diperbarui!\n\nHarga Min: *${minPrice}*\nHarga Max: *${maxPrice}*\nFee: *${fee}*`,
      });
    } catch (error) {
      console.error("Error saat mengupdate data produk:", error);
      console.log(productId);
      await sendErrorMessage(
        socket,
        remoteJid,
        "*Terjadi kesalahan* saat mengupdate produk. _Silakan coba lagi nanti._"
      );
    }
  } else {
    await sendErrorMessage(
      socket,
      remoteJid,
      `*Format data tidak valid.*
Harap gunakan format berikut
\`\`\`
!update_product
IDProduk
HargaMin
HargaMax
Fee
\`\`\``
    );
    return;
  }
};

export const detailProduct = async (
  socket: WASocket,
  pesan: string,
  remoteJid: string
) => {
  const parts = pesan.split(" ");
  if (parts.length === 2) {
    const number = remoteJid.split("@")[0];
    const isUserAdmin = await isAdmin(number);
    const [_, productId] = parts;

    if (!isUserAdmin) {
      await sendErrorMessage(
        socket,
        remoteJid,
        "*Anda tidak memiliki izin untuk mengupdate produk.*"
      );
      return;
    }

    try {
      const product = await Products.findOne({
        productId: productId.toUpperCase(),
      });

      if (!product) {
        await sendErrorMessage(
          socket,
          remoteJid,
          `Produk dengan ID *${productId.toUpperCase()}* tidak ditemukan.`
        );
        return;
      }

      let responseMessage = `*Detail Produk dengan ID ${productId.toUpperCase()}*\n`;

      if (product.type === "e-wallet" || product.type === "bank") {
        responseMessage += `
\`\`\`
ID Produk   : ${product.productId}
Provider    : ${capitalizeFirst(product.provider)}
Tipe Produk : ${product.type}
Harga Min   : ${formatPriceToIDR(product.minPrice)}
Harga Maks  : ${formatPriceToIDR(product.maxPrice)}
Fee         : ${formatPriceToIDR(product.fee)}
Deskripsi   : ${product.description}
\`\`\`
`;
      }

      if (
        product.type === "pulsa" ||
        product.type === "internet" ||
        product.type === "listrik"
      ) {
        const formattedProvider =
          product.type === "listrik"
            ? product.provider.toUpperCase()
            : capitalizeFirst(product.provider);

        responseMessage += `
\`\`\`
ID Produk   : ${product.productId}
Provider    : ${formattedProvider}
Tipe Produk : ${product.type}
Harga Modal : ${formatPriceToIDR(product.basePrice)}
Harga Jual  : ${formatPriceToIDR(product.sellPrice)}
Deskripsi   : ${product.description}
\`\`\`
`;
      }

      await socket.sendMessage(remoteJid, {
        text: responseMessage,
      });
    } catch (error) {
      console.error("Error saat mengupdate data produk:", error);
      console.log(productId);
      await sendErrorMessage(
        socket,
        remoteJid,
        "*Terjadi kesalahan* saat mengupdate produk. _Silakan coba lagi nanti._"
      );
    }
  } else {
    await sendErrorMessage(
      socket,
      remoteJid,
      `*Format data tidak valid.*
Harap gunakan format berikut
\`\`\`
!detail_product(spasi)IDProduk
\`\`\``
    );
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

  const timeout = setTimeout(() => {
    if (deleteSessions.has(remoteJid)) {
      deleteSessions.delete(remoteJid);
      socket.sendMessage(remoteJid, { text: "Waktu habis. Dibatalkan." });
    }
  }, 30000);

  deleteSessions.set(remoteJid, { productId, timeout });

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
};

export const handleDeleteConfirmation = async (
  socket: WASocket,
  pesan: string,
  remoteJid: string
) => {
  const session = deleteSessions.get(remoteJid);
  if (!session) return;

  const { productId, timeout } = session;

  clearTimeout(timeout);

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
