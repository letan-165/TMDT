
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  email: string;

  @Prop()
  password?: string;

  @Prop()
  googleId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  avatar?: string;

  @Prop({ default: 'USER' })
  role: string;

  @Prop({ required: true, enum: ['LOCAL', 'GOOGLE'] })
  provider: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
