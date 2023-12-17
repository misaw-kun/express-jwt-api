import { FilterQuery, ObtainDocumentType } from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";
import { omit } from "lodash";

export async function createUser(input: ObtainDocumentType<UserDocument>) {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e)
  }
}

export async function validatePassword(
  { email, password }: { email: string, password: string }
) {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) return false;

    const isValid = await user.comparePassword(password);
    if (!isValid) return false;

    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e)
  }
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}