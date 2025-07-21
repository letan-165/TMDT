
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CatDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    slug: string;

    @Prop()
    description?: string;

    @Prop()
    image?: string;

    @Prop({ type: Types.ObjectId, ref: 'Category', default: null })
    parent?: Types.ObjectId;

}

export const CatSchema = SchemaFactory.createForClass(Category);
