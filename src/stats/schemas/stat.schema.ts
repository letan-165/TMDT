
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StatDocument = HydratedDocument<Stat>;

@Schema()
export class Stat {
  @Prop({ default: 0 })
  totalUsers: number;

  @Prop({ default: 0 })
  totalOrders: number;

  @Prop({ default: 0 })
  totalProducts: number;

    @Prop({ default: 0 })
    totalDiscountCodes: number;

    @Prop({ default: 0 })
    totalCategories: number;

}

export const StatSchema = SchemaFactory.createForClass(Stat);
