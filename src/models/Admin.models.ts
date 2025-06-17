// models/admin.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmin extends Document {
  username: string;
  email: string;
  password: string; // hashed
}

const AdminSchema = new Schema<IAdmin>({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const Admin = mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);