import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type PaymentDocument = HydratedDocument<Payment>;

@Schema({
    timestamps: true
})
export class Payment {
    @Prop([{ type: Types.ObjectId, ref: 'Order' }])
    orderIds: Types.ObjectId[]; // Mảng các order IDs

    @Prop({ required: true })
    amount: number; // Tổng số tiền thanh toán

    @Prop({ unique: true })
    txnRef: string; // Transaction reference cho VNPAY

    @Prop()
    transactionId?: string; // Transaction ID từ VNPAY

    @Prop()
    responseCode?: string; // Response code từ VNPAY

    @Prop()
    message?: string; // Message từ VNPAY

    @Prop({
        default: 'PENDING',
        enum: ['PENDING', 'SUCCESS', 'FAILED', 'CANCELLED']
    })
    status: string;

    @Prop()
    vnpayUrl?: string; // URL VNPAY để debug

    @Prop({ type: Date })
    paidAt?: Date; // Thời gian thanh toán thành công

    @Prop()
    ipAddr?: string; // IP address của user

    @Prop()
    bankCode?: string; // Mã ngân hàng nếu có

    // Legacy fields để tương thích (nếu cần)
    @Prop()
    code?: string;

    @Prop()
    method?: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
