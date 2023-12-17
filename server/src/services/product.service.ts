import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ProductModel, { ProductDoc, ProductInput } from "../models/product.model";

export async function createProduct(input: ProductInput) {
  return ProductModel.create(input)
}

export async function findProduct(query: FilterQuery<ProductDoc>, options: QueryOptions = { lean: true }) {
  return ProductModel.findOne(query, {}, options);
}

export async function findAndUpdateProduct(query: FilterQuery<ProductDoc>, update: UpdateQuery<ProductDoc>, options: QueryOptions) {
  return ProductModel.findOneAndUpdate(query, update, options);
}

export async function deleteProduct(query: FilterQuery<ProductDoc>) {
  return ProductModel.deleteOne(query);
}