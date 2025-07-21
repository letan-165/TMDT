
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { OrderStatus } from '../enum/order-status.enum';
import { PaymentMethod } from '../enum/payment-method.enum';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: User;

    @Prop({ enum: OrderStatus, default: OrderStatus.PENDING })
    status: OrderStatus;

    @Prop({ required: true })
    totalAmount: number;

    @Prop()
    shippingFee?: number;

    @Prop()
    discountAmount?: number;

    @Prop({ enum: PaymentMethod, default: PaymentMethod.COD })
    paymentMethod: PaymentMethod;

    @Prop({ default: false })
    isPaid: boolean;

    @Prop({ type: Date })
    paymentDate?: Date;

    @Prop()
    shippingAddress: string;

    @Prop()
    recipientName: string;

    @Prop()
    recipientPhone: string;

    @Prop()
    note?: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
