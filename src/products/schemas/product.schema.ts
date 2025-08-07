import { User } from '@/users/schemas/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Category } from 'src/categories/schemas/category.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  categoryId: Category;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User'})
  sellerId: User;

  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop()
  images?: [string];

  @Prop({ required: true , default: 0 })
  price: number;

  @Prop({ default: 0 })
  stock: number;

  @Prop({ default: true })
  status: boolean;
  
}

export const ProductSchema = SchemaFactory.createForClass(Product);
