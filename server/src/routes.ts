import type { Express, Request, Response } from "express";

import validate from "./middleware/validateResource";
import requireUser from "./middleware/requireUser";

import { createUserSchema } from "./schema/user.schema";
import { createUserHandler } from "./controllers/user.controller";
import { createUserSessionHandler, deleteSessionHandler, getUserSessionsHandler } from "./controllers/session.controller";

import { createSessionSchema } from "./schema/session.schema";
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from "./schema/product.schema";

import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from "./controllers/product.controller";

function routes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  //user routes
  app.post('/api/users', validate(createUserSchema), createUserHandler);

  // session routes
  app.post('/api/sessions', validate(createSessionSchema), createUserSessionHandler);
  app.get('/api/sessions', requireUser, getUserSessionsHandler);
  app.delete('/api/sessions', requireUser, deleteSessionHandler);

  // product routes
  app.get('/api/products/:productId', validate(getProductSchema), getProductHandler);
  app.post('/api/products', [requireUser, validate(createProductSchema)], createProductHandler);
  app.put('/api/products/:productId', [requireUser, validate(updateProductSchema)], updateProductHandler);
  app.delete('/api/products/:productId', [requireUser, validate(deleteProductSchema)], deleteProductHandler);
}

export default routes;