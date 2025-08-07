import { User } from "@/users/schemas/user.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type DiscountDocument = HydratedDocument<Discount>;

@Schema({ timestamps: true })
export class Discount {
    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    sellerId: User;

    @Prop({ required: true, unique: true })
    code: string; 

    @Prop({ required: true, enum: ['fixed', 'percentage'] })
    type: string;

    @Prop({ required: true })
    value: number;

    @Prop({ required: true, default: 1 })
    quantity: number;

    @Prop({ default: 0 })
    minOrder: number;

    @Prop()
    maxDiscount: number;

    @Prop({ required: true })
    startDate: Date;

    @Prop({ required: true })
    expiryDate: Date;
}

export const DiscountSchema = SchemaFactory.createForClass(Discount);
