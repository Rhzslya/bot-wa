import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
} from "@whiskeysockets/baileys";
import pino from "pino";
import { welcomeChat } from "./utils/welcomeChat";
import { handleAddCommand } from "./utils/servicesHandlers";
import { getStatusService } from "./utils/getStatus";
import { updateStatus } from "./utils/updateStatus";
import { helperChat } from "./utils/helperChat";
import { checkProductPrice } from "./utils/productPrice";
import { helloText } from "./utils/textMessage";
import { greets } from "./utils/getGreetings";
import {
  addProduct,
  deleteProduct,
  handleDeleteConfirmation,
} from "./utils/productHandlers";
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

      await welcomeChat(socket, remoteJid, pushName, number);

      if (pesan?.startsWith("!add_service")) {
        await handleAddCommand(socket, pesan, remoteJid);
      }

      if (pesan?.startsWith("!add_product")) {
        await addProduct(socket, pesan, remoteJid);
      }

      if (pesan?.startsWith("!delete")) {
        await deleteProduct(socket, pesan, remoteJid);
      }

      if (pesan === "y" || pesan === "n") {
        await handleDeleteConfirmation(socket, pesan, remoteJid);
      }

      if (pesan?.startsWith("!status")) {
        await getStatusService(socket, pesan, remoteJid);
      }

      if (pesan?.startsWith("!update")) {
        await updateStatus(socket, pesan, remoteJid);
      }

      if (pesan.startsWith("!harga")) {
        await checkProductPrice(socket, pesan, remoteJid);
      }

      if (pesan === "!help") {
        await helperChat(socket, remoteJid);
      }
    }
  });
};
