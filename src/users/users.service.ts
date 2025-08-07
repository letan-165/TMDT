import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { hashPassword } from 'utils/hashPass';
import { generateCode } from 'utils/geneCode';
import dayjs from 'dayjs';
import { SendMailService } from '@/send-mail/send-mail.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UpdateUsersAdminDto } from './dto/update-users-admin.dto';
import aqp from 'api-query-params';
@Injectable()
export class UsersService implements OnModuleInit{
  constructor(@InjectModel(User.name) private userModel: Model<User>,
    private mailService: SendMailService,
    private jwtService: JwtService,
    private configService: ConfigService) { }

  async register(createUserDto: CreateUserDto) {
    const { email, password, name, username } = createUserDto;
    const checkEmailExists = await this.checkEmail(email);
    if (checkEmailExists) {
      throw new Error('Email already exists');
    }
    try {
      const hashedPassword = await hashPassword(password);
      const newUser = new this.userModel({
        username,
        email,
        password: hashedPassword,
        name,
        provider: 'LOCAL',
        role: 'USER',
      });
      await newUser.save();
      return {
        _id: newUser._id
      }
    } catch (error) {
      console.log('Error creating user:', error);
    }

  }

  async onModuleInit() {
    const adminExists = await this.userModel.findOne({ role: 'ADMIN' });
    if (adminExists) return;
    const passDefault = await hashPassword(this.configService.get<string>('DEFAULT_ADMIN_PASSWORD')!);
    const newUser = new this.userModel({
      username: 'admin',
      email: 'admin@example.com',
      password: passDefault,
      name: 'Admin',
      provider: 'LOCAL',
      role: 'ADMIN',
    });
    await newUser.save();
    console.log('Tài khoản admin đã được tạo thành công: username: admin, password: ' + this.configService.get<string>('DEFAULT_ADMIN_PASSWORD'));
  }

  async createAdmin(createUserDto: CreateUserDto) {
    const { email, password, name, username } = createUserDto;
    const checkEmailExists = await this.checkEmail(email);
    if (checkEmailExists) {
      throw new Error('Email already exists');
    }
    try {
      const hashedPassword = await hashPassword(password);
      const newUser = new this.userModel({
        username,
        email,
        password: hashedPassword,
        name,
        provider: 'LOCAL',
        role: 'ADMIN',
      });
      await newUser.save();
      return {
        _id: newUser._id
      }
    } catch (error) {
      console.log('Error creating admin user:', error);
    }
  }

  async processGoogleLogin(userData: any) {
    const { email, name, googleId, avatar } = userData;
    if (!email || !googleId) {
      throw new Error('Email and Google ID are required');
    }
    const existingUser = await this.userModel.findOne({ email, provider: 'GOOGLE' });
    if (existingUser) {
      return existingUser;
    }
    const existingEmail = await this.userModel.findOne({ email });
    if (existingEmail) {
      const updateUser = await this.userModel.updateOne(
        { _id: existingEmail._id },
        { googleId, provider: 'GOOGLE', avatar }
      );      
      return updateUser;
    }
    const newUser = new this.userModel({
      username: email,
      email,
      name,
      googleId,
      avatar,
      provider: 'GOOGLE',
    });
    await newUser.save();
    return newUser;
  }

  async checkEmail(email: string) {
    if (!email) {
      throw new Error('Email is required');
    }
    const user = await this.userModel.findOne({ email }).lean();
    if (user) {
      return true;
    }
    return false;
  }

  async findOneByUsername(username: string) {
    if (!username) {
      throw new Error('Username is required');
    }
    const user = await this.userModel.findOne({ username }).lean();
    if (!user) {
      return null;
    }
    return user;
  }

  async handleForgotPassword(email: string) {
    if (!email) {
      throw new Error('Email is required');
    }
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    const token = generateCode();
    await this.userModel.updateOne(
      { _id: user._id },
      { codeReset: token, codeResetExpires: dayjs().add(10, 'minutes').toDate() }
    );
    const sendMailDto = {
      email: user.email,
      name: user.name,
      code: token,
    };
    await this.mailService.sendMail(sendMailDto);
    return { message: 'Password reset email sent' };
  }

  async checkCodeResetPassword(email: string, code: string) {
    if (!email || !code) {
      throw new Error('Email and code are required');
    }
    const user = await this.userModel.findOne({ email, codeReset: code });
    if (!user) {
      throw new Error('Invalid reset code');
    }
    if (dayjs(user.codeResetExpires).isBefore(dayjs())) {
      throw new Error('Reset code has expired');
    }
    const token = await this.jwtService.signAsync({ email, userId: user._id, type: 'resetPassword' },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '10m'
      });

    await this.userModel.updateOne(
      { _id: user._id },
      { passwordResetToken: token, passwordResetTokenExpires: dayjs().add(10, 'minutes').toDate() }
    );
    return { message: 'Code is valid', resetToken: token };
  }

  async resetPassword(resetToken: string, newPassword: string) {
    if (!resetToken || !newPassword) {
      throw new Error('Reset token and new password are required');
    }
    const decoded = await this.jwtService.verifyAsync(resetToken, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });
    const user = await this.userModel.findById(decoded.userId);
    if (!user) {
      throw new Error('User not found');
    }
    const hashedPassword = await hashPassword(newPassword);
    await this.userModel.updateOne(
      { _id: user._id },
      { password: hashedPassword, passwordResetToken: null, passwordResetTokenExpires: null }
    );
    return { message: 'Password reset successfully' };
  }

  async updateProfile(userId: string, updateUserDto: UpdateUserDto) {
    if (!userId || !updateUserDto) {
      throw new Error('User ID and update data are required');
    }
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true });
    return updatedUser;
  }

  async updateUser(userId: string, updateUserDto: UpdateUsersAdminDto) {
    if (!userId || !updateUserDto) {
      throw new Error('User ID and update data are required');
    }
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true });
    return updatedUser;
  }

  async findAll(query: string, current: number, pageSize: number) {
    const { filter, sort } = aqp(query);
    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;
    if (!current) current = 1;
    if (!pageSize) pageSize = 10;

    const totalItems = await this.userModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / pageSize); 
    const skip = (current - 1) * pageSize;
    const users = await this.userModel.find(filter).sort(sort as any).skip(skip).limit(pageSize).lean();
    return { users, totalPages };
  }

  async findOne(id: string) {
    if (!id) {
      throw new Error('User ID is required');
    }
    const user = await this.userModel.findById(id).lean();
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async remove(id: string) {
    if (!id) {
      throw new Error('User ID is required');
    }
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    await this.userModel.deleteOne({ _id: id });
    return { message: 'User deleted successfully' };
  }

}
