import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Public } from '@/auth/decorator/public';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  @Public()
  async create(@Body() createCartDto: CreateCartDto) {
    return await this.cartsService.create(createCartDto);
  }


  @Get()
  @Public()
  async findAll(@Query() query: string, @Query('current') current: number, @Query('pageSize') pageSize: number) {
    return await this.cartsService.findAll(query, current, pageSize);
  }

  @Get('/me/:id')
  @Public()
  async findCartByUserId(@Param('id') userId: string) {
    return await this.cartsService.findCartByUserId(userId);
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string) {
    return await this.cartsService.findOne(id);
  }

  @Patch(':id')
  @Public()
  async updateCart(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return await this.cartsService.update(id, updateCartDto);
  }

  @Delete(':id')
  @Public()
  async removeProductFromCart(@Param('id') cartId: string, @Body('productId') productId: string) {
    return await this.cartsService.removeProductFromCart(cartId, productId);
  }

  @Delete('all/:id')
  @Public()
  async removeCartByUserId(@Param('id') id: string) {
    return await this.cartsService.remove(id);
  }
}