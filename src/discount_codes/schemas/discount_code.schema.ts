
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type DiscountCodeDocument = HydratedDocument<DiscountCode>;

@Schema()
export class DiscountCode {
    @Prop({ required: true, unique: true })
    code: string;

    @Prop({ required: true })
    discountType: 'PERCENTAGE' | 'FIXED';

    @Prop({ required: true })
    value: number;

    @Prop({ default: 0 })
    usageLimit: number;

    @Prop({ default: 0 })
    usedCount: number;

    @Prop({ type: Date, required: true })
    startDate: Date;

    @Prop({ type: Date, required: true })
    endDate: Date;

    @Prop({ default: true })
    isActive: boolean;
}

export const DiscountCodeSchema = SchemaFactory.createForClass(DiscountCode);
