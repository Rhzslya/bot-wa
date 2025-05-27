import mongoose, { Document } from "mongoose";

export interface IProducts extends Document {
  productId: string;
  provider: string;
  type: string;
  sellPrice?: number;
  basePrice?: number;
  minPrice?: number;
  maxPrice?: number;
  fee?: number;
  description: string;
}

const productsSchema = new mongoose.Schema<IProducts>(
  {
    productId: { type: String, required: true, unique: true },
    provider: { type: String, required: true },
    type: { type: String, required: true },
    sellPrice: { type: Number },
    basePrice: { type: Number },
    minPrice: { type: Number },
    maxPrice: { type: Number },
    fee: { type: Number },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Products = mongoose.model<IProducts>("Products", productsSchema);
export default Products;
