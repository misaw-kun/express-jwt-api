import type { Request, Response } from "express";
import { validatePassword } from "../services/user.service";
import { createSession, findSessions, updateSession } from "../services/session.service";
import { signJwt } from "../utils/jwt.utils";
import config from 'config';

export async function createUserSessionHandler(req: Request, res: Response) {
  // validate user's password
  const user = await validatePassword(req.body)
  if (!user) return res.status(401).send("Invalid email or password");

  // create a session
  const session = await createSession(user._id, req.get("user-agent") || "");

  // create an access token
  const accessToken = signJwt({
    ...user,
    session: session._id
  }, {
    expiresIn: config.get<string>("accessTokenTTL") //15 minutes
  });

  // create a refresh token
  const refreshToken = signJwt({
    ...user,
    session: session._id
  }, {
    expiresIn: config.get<string>("refreshTokenTTL") //1 year
  });

  // return access & refresh token
  return res.send({ accessToken, refreshToken })
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  // fetching all the valid sessions of the user
  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  // marking the session invalid to revoke it
  await updateSession({ _id: sessionId }, { valid: false })

  return res.send({
    accessToken: null,
    refreshToken: null
  })
}