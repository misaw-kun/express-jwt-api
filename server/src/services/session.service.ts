import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDoc } from "../models/session.model";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { get } from "lodash";
import { findUser } from "./user.service";
import config from 'config';

export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({
    user: userId,
    userAgent
  });

  return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDoc>) {
  return SessionModel.find(query).lean();
}

export async function updateSession(
  query: FilterQuery<SessionDoc>,
  update: UpdateQuery<SessionDoc>
) {
  return SessionModel.updateOne(query, update);
}

export async function reIssueAccessToken({ refreshToken }: { refreshToken: string }) {
  const { decoded } = verifyJwt(refreshToken);
  const decodedId = get(decoded, "session");

  if (!decoded || !decodedId) return false;

  const session = await SessionModel.findById(decodedId);

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  // create an access token
  const accessToken = signJwt({
    ...user,
    session: session._id
  }, {
    expiresIn: config.get<string>("accessTokenTTL") //15 minutes
  });

  return accessToken;
}