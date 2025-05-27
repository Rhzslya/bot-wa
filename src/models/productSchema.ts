import mongoose, { Document } from "mongoose";

export interface IProducts extends Document {
  productId: string;
  provider: string;
  type: string;
  sellPrice: number;
  basePrice: number;
  description: string;
}

const productsSchema = new mongoose.Schema<IProducts>(
  {
    productId: { type: String, required: true, unique: true },
    provider: { type: String, required: true },
    type: { type: String, required: true },
    sellPrice: { type: Number, required: true },
    basePrice: { type: Number, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Products = mongoose.model<IProducts>("Products", productsSchema);
export default Products;
