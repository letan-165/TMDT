
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ReviewDocument = HydratedDocument<Review>;

@Schema()
export class Review {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
    product: Types.ObjectId;

    @Prop({ type: Number, min: 1, max: 5, required: true })
    rating: number;

    @Prop()
    comment?: string;

    @Prop({ default: false })
    isHidden: boolean;

    @Prop({ default: 0 })
    likeCount: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
