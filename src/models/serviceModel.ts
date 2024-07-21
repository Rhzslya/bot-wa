import mongoose from "mongoose";
const serviceSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  serviceType: {
    type: String,
    required: true,
  },
  modelType: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  serviceId: {
    type: Number,
    required: true,
    unique: true, // Ensure serviceId is unique
  },
  status: {
    type: String,
    default: "Belum Selesai",
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set default value to current date and time
  },
  updatedAt: {
    type: Date,
    // Set default value to current date and time
  },
});

// Tambahkan plugin AutoIncrement ke skema jika versi mongoose-sequence terbaru mendukung
const Service =
  mongoose.models.service || mongoose.model("service", serviceSchema);

export default Service;
