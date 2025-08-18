import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Public } from '@/auth/decorator/public';
import { VnpayCallbackDto } from './dto/callback-vnpay.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post('vnpay')
  @Public()
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    return await this.paymentService.createPaymentUrl(createPaymentDto);
  }

  @Get('callback')
  @Public()
  async callback(@Body() CallbackVnpayDto: VnpayCallbackDto) {
    return await this.paymentService.handleVnpayCallback(CallbackVnpayDto);
  }

  @Get('back-list')
  async getBackList() {
    return await this.paymentService.getBackList();
  }

}
