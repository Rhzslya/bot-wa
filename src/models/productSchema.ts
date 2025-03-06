import mongoose, { Document } from "mongoose";

export interface IProducts extends Document {
  productId: string;
  provider: string;
  type: string;
  description: string;
  sellPrice: number;
}

const productsSchema = new mongoose.Schema<IProducts>(
  {
    productId: { type: String, required: true, unique: true },
    provider: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true }, // Hapus `enum`
    sellPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

const Products = mongoose.model<IProducts>("Products", productsSchema);
export default Products;
