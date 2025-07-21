
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Order } from 'src/orders/schemas/order.schema';

export type OrderDetailDocument = HydratedDocument<OrderDetail>;

@Schema()
export class OrderDetail {
  @Prop({ type: Types.ObjectId, ref: 'Order', required: true })
  orderId: Order;

    @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
    productId: Types.ObjectId;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;

  @Prop({ default: 0 })
  discount: number;

}

export const OrderDetailSchema = SchemaFactory.createForClass(OrderDetail);
