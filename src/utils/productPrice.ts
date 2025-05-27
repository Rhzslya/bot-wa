import { WASocket } from "@whiskeysockets/baileys";
import Products from "../models/productSchema";
import { capitalizeFirst } from "./capitalizeFirst";

const sendErrorMessage = async (
  socket: WASocket,
  remoteJid: string,
  message: string
) => {
  await socket.sendMessage(remoteJid, { text: message });
};

const formatPriceToIDR = (price: number): string => {
  return `Rp${price.toLocaleString("id-ID")}`;
};

export const checkProductPrice = async (
  socket: WASocket,
  pesan: string,
  remoteJid: string
) => {
  const parts = pesan.split(" ");

  if (parts.length < 2) {
    await sendErrorMessage(
      socket,
      remoteJid,
      `*Format perintah tidak valid.* \nHarap gunakan format berikut:\n  
\`\`\`!harga [Nama Provider]\`\`\`  
\nContoh: \`!harga Axis\` atau \`!harga Telkomsel\``
    );
    return;
  }

  const providerName = parts.slice(1).join(" ").trim();

  if (!providerName) {
    await sendErrorMessage(
      socket,
      remoteJid,
      `*Nama provider tidak boleh kosong.* \nHarap gunakan format berikut:\n  
\`\`\`!harga [Nama Provider]\`\`\`  
\nContoh: \`!harga Axis\` atau \`!harga Telkomsel\``
    );
    return;
  }

  try {
    const products = await Products.find({
      provider: new RegExp(`^${providerName}$`, "i"),
    });

    if (products.length > 0) {
      let responseMessage = `Berikut adalah harga Pulsa dan Paket untuk Produk *${capitalizeFirst(
        providerName
      )}*\n\n`;

      const pulsaProducts = products.filter(
        (product) => product.type?.toLowerCase() === "pulsa"
      );
      const internetProducts = products.filter(
        (product) => product.type?.toLowerCase() === "internet"
      );

      if (pulsaProducts.length > 0) {
        responseMessage += "*Daftar Pulsa*\n\n```";

        const sortedPulsa = pulsaProducts.sort(
          (a, b) => a.sellPrice - b.sellPrice
        );

        let maxNominalLength = 0;
        const nominalDisplays = sortedPulsa.map((product) => {
          const nominal = product.basePrice
            ? parseInt(product.basePrice.toString()).toLocaleString("id-ID")
            : capitalizeFirst(product.description);
          if (nominal.length > maxNominalLength) {
            maxNominalLength = nominal.length;
          }
          return nominal;
        });

        const NBSP = "\u00A0";
        const spacing = 4;

        sortedPulsa.forEach((product, index) => {
          const nominal = nominalDisplays[index].padStart(
            maxNominalLength,
            NBSP
          );
          const paddedNominal = nominal.padEnd(
            maxNominalLength + spacing,
            NBSP
          );
          const line = `• ${paddedNominal}: ${formatPriceToIDR(
            product.sellPrice
          )}`;
          responseMessage += line + "\n";
        });

        responseMessage += "```\n";
      }
      if (internetProducts.length > 0) {
        responseMessage += "*Daftar Paket Internet*\n\n```";

        const sortedInternet = internetProducts.sort(
          (a, b) => a.sellPrice - b.sellPrice
        );

        let maxDescriptionLength = 0;
        const descriptionDisplays = sortedInternet.map((product) => {
          const description = `[${product.productId}] ${capitalizeFirst(
            product.description
          )}`;
          if (description.length > maxDescriptionLength) {
            maxDescriptionLength = description.length;
          }
          return description;
        });

        const NBSP = "\u00A0";
        const spacing = 1;

        // Ambil prefix huruf dari productId (contoh: AX1 -> AX, AXT12 -> AXT)
        const getLettersOnly = (productId) => {
          const match = productId.match(/^[A-Za-z]+/);
          return match ? match[0] : productId;
        };

        let prevPrefix = "";

        sortedInternet.forEach((product, index) => {
          const currentPrefix = getLettersOnly(product.productId).toUpperCase();

          if (prevPrefix && prevPrefix !== currentPrefix) {
            responseMessage += "\n"; // Tambahkan spasi antar blok
          }

          prevPrefix = currentPrefix;

          const description = descriptionDisplays[index].padEnd(
            maxDescriptionLength + spacing,
            NBSP
          );

          const line = `• ${description}: ${formatPriceToIDR(
            product.sellPrice
          )}`;
          responseMessage += line + "\n";
        });

        responseMessage += "```\n";
      }

      if (
        pulsaProducts.length === 0 &&
        internetProducts.length === 0 &&
        products.length > 0
      ) {
        responseMessage += `*Produk Lainnya:*\n`;
        products.forEach((product) => {
          responseMessage += `• *${product.productId}* - ${capitalizeFirst(
            product.description
          )}\n`;
          responseMessage += `  ${formatPriceToIDR(product.sellPrice)}\n\n`;
        });
      }

      await socket.sendMessage(remoteJid, { text: responseMessage });
    } else {
      await sendErrorMessage(
        socket,
        remoteJid,
        `*Tidak ada produk ditemukan* untuk Provider *${capitalizeFirst(
          providerName
        )}*.`
      );
    }
  } catch (error) {
    console.error("Error saat mengambil data produk:", error);
    await sendErrorMessage(
      socket,
      remoteJid,
      "*Terjadi kesalahan saat mengambil data produk.* Silakan coba lagi nanti."
    );
  }
};
