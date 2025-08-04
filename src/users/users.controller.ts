import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('update/profile')
  async updateProfile(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user.id;
    return await this.usersService.updateProfile(userId, updateUserDto);
  }

  @Patch('update/:id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.updateProfile(id, updateUserDto);
  }

  @Post('create-admin')
  async createAdmin(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createAdmin(createUserDto);
  }

  @Get()
  async findAll(@Query() query: string, @Query('current') current: number, @Query('pageSize') pageSize: number) {
    return await this.usersService.findAll(query, current, pageSize);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}