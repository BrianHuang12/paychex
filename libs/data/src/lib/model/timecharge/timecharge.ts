import { IBreak, breakSchema } from "../break";
import { Schema, model } from 'mongoose';

export interface ITimeCharge {
  createdDate: Date,
  closedDate: Date,
  breaks: IBreak[]
}

export const timeChargeSchema = new Schema<ITimeCharge>({
  createdDate: {type: Date, default: Date.now},
  closedDate: {type: Date },
  breaks: [breakSchema]
})

export const TimeCharge = model<ITimeCharge>('TimeCharge', timeChargeSchema);

