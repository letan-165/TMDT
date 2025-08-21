import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Public } from '@/auth/decorator/public';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  @Public()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Get()
  @Public()
  findAll(@Query() query: any, @Query('current') current: number, @Query('pageSize') pageSize: number) {
    return this.ordersService.findAll(query, current, pageSize);
  }

  @Patch(':id')
  @Public()
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.updateStatus(id, updateOrderDto);
    
  }

  @Get('user/:userId')
  @Public()
  findOrdersByUserId(@Param('userId') userId: string) {
    return this.ordersService.findOrdersByUserId(userId);
  }

  @Delete(':id')
  @Public()
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }

  @Get('seller/:sellerId')
  @Public()
  findOrdersBySellerId(@Param('sellerId') sellerId: string) {
    return this.ordersService.findOrdersBySellerId(sellerId);
  }

}
