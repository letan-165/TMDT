
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Product } from '../../products/schemas/product.schema';
import { Discount } from '../../discount/schemas/discount.schema';
import { OrderStatus } from '../enum/status.enum';
export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: User;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    sellerId: User;

    @Prop([{
        productId: { type: Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
    }])
    items: Array<{
        productId: Product;
        quantity: number;
        price: number;
    }>;

    @Prop({ required: true })
    totalAmount: number;

    @Prop({ type: Types.ObjectId, ref: 'Discount', required: false })
    discountId?: Discount;

    @Prop({ default: OrderStatus.PENDING, enum: OrderStatus })
    status: OrderStatus;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
