import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Payment, PaymentDocument } from './schemas/payment.schema';
import { Model } from 'mongoose';
import { VnpayService } from 'nestjs-vnpay';
import { ConfigService } from '@nestjs/config';
import { ProductCode, VnpLocale } from 'vnpay';
import { OrdersService } from '@/orders/orders.service';
import { CallbackVnpayDto } from './dto/callback-vnpay.dto';
@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    private vnpayService: VnpayService,
    private configService: ConfigService,
    private ordersService: OrdersService
  ) { }

  async createPaymentUrl(createPaymentDto: CreatePaymentDto, req: Request) {
    try {
      const vnpayURl = this.vnpayService.buildPaymentUrl({
        vnp_TxnRef: createPaymentDto.orderId,
        vnp_Amount: createPaymentDto.amount,
        vnp_IpAddr: req.headers['x-forwarded-for'] || '127.0.0.1',
        vnp_ReturnUrl: this.configService.get<string>('VNPAY_RETURN_URL')!,
        vnp_OrderInfo: `Thanh toán hóa đơn đặt hàng ${createPaymentDto.orderId}`,
        vnp_Locale: VnpLocale.VN,
        vnp_OrderType: ProductCode.Other,
      })
      return vnpayURl;
    } catch (error) {
      console.error('Error creating payment URL:', error);
      throw new Error(`Failed to create payment URL: ${error.message}`);
    }

  }

  
  async getBackList() {
    return await this.paymentModel.find().lean();
  }


}
