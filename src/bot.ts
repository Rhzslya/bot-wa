import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
} from "@whiskeysockets/baileys";
import pino from "pino";
import User from "./models/userModel";
import Service from "./models/serviceModel";
export const connectWhatsapp = async () => {
  const { state, saveCreds } = await useMultiFileAuthState("session");
  const socket = makeWASocket({
    printQRInTerminal: true,
    auth: state,
    logger: pino({ level: "silent" }) as any,
  });

  socket.ev.on("creds.update", saveCreds);

  socket.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const shouldReconnect =
        (lastDisconnect?.error as any)?.output?.statusCode !==
        DisconnectReason.loggedOut;
      if (shouldReconnect) {
        console.log("Reconnecting...");
        await connectWhatsapp();
      } else {
        console.log("Connection closed. You are logged out.");
      }
    } else if (connection === "open") {
      console.log("Bot Ready");
    }
  });

  socket.ev.on("messages.upsert", async (msg) => {
    const chat = msg.messages[0];
    const pesan =
      (
        chat.message?.extendedTextMessage?.text ??
        chat.message?.ephemeralMessage?.message?.extendedTextMessage?.text ??
        chat.message?.conversation
      )?.toLowerCase() || "";

    if (!chat.key.fromMe) {
      const remoteJid = chat.key.remoteJid;
      const pushName = chat.pushName;
      const number = remoteJid?.split("@")[0];

      const user = await User.findOne({ id: remoteJid });

      await User.findOneAndUpdate(
        { id: remoteJid },
        { username: pushName, number: number },
        { upsert: true, new: true }
      );

      if (pesan === "halo") {
        await socket.sendMessage(remoteJid, {
          text: `Halo! ${
            user?.username || pushName
          }, Selamat Datang di Sinari Cell, Ada yang bisa saya bantu?`,
        });
      }

      if (pesan?.startsWith("!add ")) {
        const parts = pesan.split("\n");
        if (parts.length === 5) {
          const [_, username, phoneNumber, serviceType, price] = parts;

          const service = new Service({
            username,
            number: phoneNumber,
            serviceType,
            price: parseInt(price, 10),
            serviceId: new Date().getTime(), // Unique identifier
          });

          try {
            await service.save();
            await socket.sendMessage(remoteJid, {
              text: `Data Tersimpan dengan ServiceID: ${service.serviceId}`,
            });
          } catch (error) {
            console.error("Error saat menyimpan data:", error);
            await socket.sendMessage(remoteJid, {
              text: "Terjadi kesalahan saat menyimpan data. Silakan coba lagi.",
            });
          }
        } else {
          await socket.sendMessage(remoteJid, {
            text:
              "Format data tidak valid. Harap gunakan format: !add Nama NoHp TipeServis Harga",
          });
        }
      }
    }
  });
};
