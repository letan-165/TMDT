import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CartDocument = HydratedDocument<Cart>;
@Schema({ timestamps: true })
export class Cart {
    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    userId: Types.ObjectId;

    @Prop([{
        _id: false,
        productId: { type: Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, default: 1, min: 1 }
    }])
    items: { productId: Types.ObjectId; quantity: number }[];
}
export const CartSchema = SchemaFactory.createForClass(Cart);
