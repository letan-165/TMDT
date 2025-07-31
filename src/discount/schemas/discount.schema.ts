import { User } from "@/users/schemas/user.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type DiscountDocument = HydratedDocument<Discount>;
@Schema({ timestamps: true })
export class Discount {
    @Prop({ required: true, type: Types.ObjectId, ref: 'User'})
    sellerId: User;

    @Prop()
    type: string;

    @Prop()
    value: number;

    @Prop()
    quantity: number;

    @Prop()
    minOrder: number;

    @Prop()
    maxDiscount: number;

    @Prop()
    expiryDate: Date;
}

export const DiscountSchema = SchemaFactory.createForClass(Discount);
