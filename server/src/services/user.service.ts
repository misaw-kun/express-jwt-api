import { ObtainDocumentType } from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";

export async function createUser(input: ObtainDocumentType<UserDocument>) {
  try {
    return await UserModel.create(input);
  } catch (e: any) {
    throw new Error(e)
  }
}