import { ITimeCharge, timeChargeSchema } from '../timecharge';
import { Schema, model } from 'mongoose';

export interface IUser {
  name: string,
  email: string,
  password: string,
  roles: 'admin' | 'user',
  timeCharge: ITimeCharge[],
  createdAt: Date
}

export const userSchema = new Schema<IUser>({
  name: { type: String, required: true},
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  timeCharge: [timeChargeSchema],
  createdAt: { type: Date, default: Date.now}
});

export const User = model<IUser>('User', userSchema);
