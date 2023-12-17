import { Request, Response, NextFunction } from "express";

// middleware for checking if a user exists to perform any authenticated requests (like creating a session, etc.)

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user

  if (!user) return res.sendStatus(403);

  return next();
}

export default requireUser;