
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true})
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password?: string;

  @Prop()
  googleId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  avatar?: string;

  @Prop()
  address?: string;

  @Prop({ default: 'USER' })
  role: string;

  @Prop({ required: true, enum: ['LOCAL', 'GOOGLE'] })
  provider: string;

  @Prop()
  codeReset: string;

  @Prop({ type: Date, default: null })
  codeResetExpires: Date;

  @Prop()
  passwordResetToken?: string;

  @Prop({ type: Date, default: null })
  passwordResetTokenExpires?: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);

