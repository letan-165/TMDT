import { User } from "@/users/schemas/user.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type DiscountDocument = HydratedDocument<Discount>;

@Schema({ timestamps: true })
export class Discount {
    @Prop({default: null})
    name: string;
    @Prop({ required: true, unique: true })
    code: string; 

    @Prop({ required: true })
    value: number; // Phần trăm

    @Prop({type: Types.ObjectId, ref: 'User', required: true })
    createdBy: User;
}

export const DiscountSchema = SchemaFactory.createForClass(Discount);
