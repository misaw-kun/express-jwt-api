import mongoose, { Schema, Types, model } from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

export interface ProductInput {
  user: Types.ObjectId;
  title: string;
  description: string;
  price: number;
  image: string;
}

export interface ProductDoc extends ProductInput, mongoose.Document {
  productId: string;
  createdAt: Date,
  updatedAt: Date,
}

const productSchema = new Schema<ProductDoc>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  productId: {
    type: String,
    required: true,
    unique: true,
    default: () => `product_${nanoid()}`
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
}, {
  timestamps: true
});

const ProductModel = model("Product", productSchema);

export default ProductModel