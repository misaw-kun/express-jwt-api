import type { Request, Response } from "express";
import { CreateProductInput, DeleteProductInput, ReadProductInput, UpdateProductInput } from "../schema/product.schema";
import { createProduct, deleteProduct, findAndUpdateProduct, findProduct } from "../services/product.service";
import log from "../utils/logger";

export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;

    const body = req.body;

    const product = await createProduct({ ...body, user: userId });

    return res.send(product);
  } catch (e: any) {
    log.error(e.message)
  }
}

export async function updateProductHandler(
  req: Request<UpdateProductInput["params"]>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;

    const productId = req.params.productId;
    const update = req.body;

    const product = await findProduct({ productId })

    // if product not found
    if (!product) return res.status(404);

    // if user is not the one who created the listing
    if (String(product.user) !== userId) return res.send(403);

    const updatedProduct = await findAndUpdateProduct({ productId }, update, { new: true });

    return res.send(updatedProduct);
  } catch (e: any) {
    log.error(e.message);
  }
}

export async function getProductHandler(
  req: Request<ReadProductInput["params"]>,
  res: Response
) {
  const productId = req.params.productId;
  const product = await findProduct({ productId });

  // if product not found
  if (!product) return res.status(404);

  return res.send(product);
}

export async function deleteProductHandler(
  req: Request<DeleteProductInput["params"]>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;
    const productId = req.params.productId;

    const product = await findProduct({ productId });

    // if product not found
    if (!product) return res.status(404);

    // if user is not the one who created the listing
    if (String(product.user) !== userId) return res.send(403);

    await deleteProduct({ productId });

    return res.sendStatus(204);
  } catch (e: any) {
    log.error(e.message);
  }
}