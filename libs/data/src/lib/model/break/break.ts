import { Schema, model } from 'mongoose';

export interface IBreak {
  startDate: Date,
  endDate: Date
}

export const breakSchema = new Schema<IBreak>({
  startDate: {type: Date, default: Date.now },
  endDate: {type: Date }
})

export const Break = model<IBreak>('Break', breakSchema);
