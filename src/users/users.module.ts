import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { SendMailModule } from '@/send-mail/send-mail.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema}]), SendMailModule, JwtModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
