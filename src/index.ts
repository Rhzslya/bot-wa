// src/index.ts
import { connect } from "./dbConfig/dbConfig";
import { connectWhatsapp } from "./bot";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" }); // Memuat variabel dari .env.local
async function main() {
  await connect();
  await connectWhatsapp();
}

main().catch((error) => console.error("Error starting bot", error));
