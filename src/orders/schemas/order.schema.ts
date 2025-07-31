
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { OrderStatus } from '../enum/order-status.enum';

import { Payment } from '@/payment/schemas/payment.schema';
import { Discount } from '@/discount/schemas/discount.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: User;

    @Prop({ type: Types.ObjectId, ref: 'Discount' })
    discountId?: Discount;

    @Prop({ type: Types.ObjectId, ref: 'Payment'})
    paymentId: Payment

    @Prop({ enum: OrderStatus, default: OrderStatus.PENDING })
    status: OrderStatus;

    @Prop({ required: true })
    totalAmount: number;

    
}

export const OrderSchema = SchemaFactory.createForClass(Order);
