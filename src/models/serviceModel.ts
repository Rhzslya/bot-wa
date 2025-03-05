import mongoose, { Document } from "mongoose";

export interface IService extends Document {
  serviceId: number;
  username: string;
  number: string;
  serviceType: string;
  modelType: string;
  price: number;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const serviceSchema = new mongoose.Schema<IService>(
  {
    serviceId: { type: Number, required: true, unique: true },
    username: { type: String, required: true },
    number: { type: String, required: true },
    serviceType: { type: String, required: true },
    modelType: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, default: "Belum Selesai" },
  },
  { timestamps: true } // Ini akan otomatis menambahkan dan mengupdate createdAt & updatedAt
);

const Service = mongoose.model<IService>("Service", serviceSchema);
export default Service;
