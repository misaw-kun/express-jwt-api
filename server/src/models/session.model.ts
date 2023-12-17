import mongoose, { Schema, Types, model } from "mongoose";

export interface SessionDoc {
  user: Types.ObjectId;
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new Schema<SessionDoc>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  valid: { type: Boolean, default: true },
  userAgent: { type: String }
}, {
  timestamps: true
});

const SessionModel = model("Session", sessionSchema);

export default SessionModel