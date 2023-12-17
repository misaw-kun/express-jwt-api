import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import config from 'config';

export interface UserInput {
  email: string
  name: string
  password: string,
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date,
  updatedAt: Date,
  comparePassword(candidatePassword: string): Promise<boolean>
}

const userSchema = new mongoose.Schema<UserDocument>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true }
}, {
  timestamps: true
});

// pre-save hook where we check for password and skip or salt it depending upon if its modified or not
userSchema.pre("save", async function (next) {
  let user = this;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));

  const hash = bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

// schema method to check if passwords match or not
userSchema.method("comparePassword", async function
  (candidatePassword: string): Promise<boolean> {
  const user = this as UserDocument;

  try {
    return bcrypt.compare(candidatePassword, user.password);
  } catch (e) {
    return false
  }
})

const UserModel = mongoose.model("User", userSchema);

export default UserModel