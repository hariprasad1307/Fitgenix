import mongoose, { Schema, Document } from "mongoose";

export interface IDiet extends Document {
  name: string;
  height: number;
  weight: number;
  age: number;
  gender: string;
  workout: string;
  weight_change: number;
  calories: number;
  plan: any;
}

const DietSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    workout: { type: String, required: true },
    weight_change: { type: Number, required: true },
    calories: { type: Number, required: true },
    plan: { type: Object, required: true }, // Stores generated plan
  },
  { timestamps: true }
);

export default mongoose.model<IDiet>("Diet", DietSchema);
