import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PaymentDocument = HydratedDocument<Payment>;
@Schema({
    timestamps: true,
    strict: false // Cho phép lưu các trường không được định nghĩa trong schema
})
export class Payment {
    code: string;
    method: string;
}
export const PaymentSchema = SchemaFactory.createForClass(Payment);
