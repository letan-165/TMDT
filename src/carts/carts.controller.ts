import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
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

  @Get('carts/me')
  @Public()
  async findCartByUserId(@Req() req) {
    return await this.cartsService.findCartByUserId(req.user.userId);
  }

  @Patch(':id')
  @Public()
  async update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return await this.cartsService.update(id, updateCartDto);
  }

  @Get()
  @Public()
  async findAll() {
    return await this.cartsService.findAll();
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string) {
    return await this.cartsService.findOne(id);
  }

  @Delete(':id')
  @Public()
  async removeProductFromCart(@Param('id') cartId: string, @Body('productId') productId: string) {
    return await this.cartsService.removeProductFromCart(cartId, productId);
  }
}
