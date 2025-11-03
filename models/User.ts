import mongoose, { Model, Document, Schema } from 'mongoose';

// Interface for the User document
export interface IUser extends Document {
  name: string;
  email: string;
  googleId?: string;
  avatarUrl?: string;
  role: 'USER' | 'ADMIN';
  emailVerified: Date | null;
  otp: string | null;
  otpExpires: Date | null;
}

// Mongoose Schema
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  googleId: { type: String, unique: true, sparse: true },
  avatarUrl: { type: String },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER',
  },
  emailVerified: {
    type: Date,
    default: null,
  },
  otp: {
    type: String,
    default: null,
  },
  otpExpires: {
    type: Date,
    default: null,
  },
}, { timestamps: true });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
