import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RevenueStatDocument = HydratedDocument<RevenueStat>;

@Schema({ timestamps: true })
export class RevenueStat {
    @Prop({ required: true })
    year: number;

    @Prop({ required: true, min: 1, max: 12 })
    month: number;

    @Prop({ default: 0 })
    totalRevenue: number;

    @Prop({ default: 0 })
    totalOrders: number;

    @Prop({ default: 0 })
    totalProducts: number;

    @Prop({ default: 0 })
    totalCustomers: number;

    @Prop({ default: 0 })
    averageOrderValue: number;

    @Prop({ type: Date, default: Date.now })
    recordedAt: Date;
}

export const RevenueStatSchema = SchemaFactory.createForClass(RevenueStat);

// Tạo index unique để không có duplicate data cho cùng tháng/năm
RevenueStatSchema.index({ year: 1, month: 1 }, { unique: true });
