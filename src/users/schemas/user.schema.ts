
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

  @Prop({default: null})
  password?: string;

  @Prop({default: null})
  googleId: string;

  @Prop({default: null})
  name: string;

  @Prop({default: null})
  avatar?: string;

  @Prop({default: null})
  address?: string;

  @Prop({default: null})
  phone?: string;

  @Prop({ default: 'USER' })
  role: string;

  @Prop({ required: true, enum: ['LOCAL', 'GOOGLE'] })
  provider: string;

  @Prop({default: null})
  codeReset: string;

  @Prop({ type: Date, default: null })
  codeResetExpires: Date;

  @Prop({default: null})
  passwordResetToken?: string;

  @Prop({ type: Date, default: null })
  passwordResetTokenExpires?: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);

