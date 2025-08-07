import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CallbackVnpayDto } from './dto/callback-vnpay.dto';
import { Public } from '@/auth/decorator/public';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post('vnpay')
  @Public()
  async create(@Body() createPaymentDto: CreatePaymentDto, @Req() req: Request) {
    return await this.paymentService.createPaymentUrl(createPaymentDto, req);
  }



  @Get('back-list')
  async getBackList() {
    return await this.paymentService.getBackList();
  }

}
