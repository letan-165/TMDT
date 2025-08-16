import { User } from "@/users/schemas/user.schema";
import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type StoreDocument = HydratedDocument<Store>;

@Schema({ timestamps: true })
export class Store {
    @Prop({ required: true})
    name: string; 

    @Prop({ required: true })
    phone: string;

    @Prop({ required: true })
    address: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: User;

}

export const StoreSchema = SchemaFactory.createForClass(Store);