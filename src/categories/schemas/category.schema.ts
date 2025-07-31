
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
    @Prop({ required: true })
    name: string;

    @Prop([String])
    tags?: string[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
