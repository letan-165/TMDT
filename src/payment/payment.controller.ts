import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Public } from '@/auth/decorator/public';
import { VnpayCallbackDto } from './dto/callback-vnpay.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post('create')
  @Public()
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return await this.paymentService.createPaymentUrl(createPaymentDto);
  }

  @Post('vnpay') // Legacy endpoint
  @Public()
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    return await this.paymentService.createPaymentUrl(createPaymentDto);
  }

  @Get('callback')
  @Public()
  async vnpayCallback(@Query() callbackQuery: VnpayCallbackDto) {
    return await this.paymentService.handleVnpayCallback(callbackQuery);
  }

  @Get('list')
  async getPaymentList() {
    return await this.paymentService.getPaymentList();
  }

  @Get(':id')
  async getPaymentById(@Param('id') id: string) {
    return await this.paymentService.getPaymentById(id);
  }

  @Get('orders/:orderIds')
  async getPaymentsByOrderIds(@Param('orderIds') orderIds: string) {
    const orderIdArray = orderIds.split(',');
    return await this.paymentService.getPaymentsByOrderIds(orderIdArray);
  }

  @Patch(':id/cancel')
  async cancelPayment(@Param('id') id: string) {
    return await this.paymentService.cancelPayment(id);
  }

  @Get('back-list') // Legacy endpoint
  async getBackList() {
    return await this.paymentService.getBackList();
  }
}
