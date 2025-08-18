import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Payment, PaymentDocument } from './schemas/payment.schema';
import { Model } from 'mongoose';
import { VnpayService } from 'nestjs-vnpay';
import { ConfigService } from '@nestjs/config';
import { ProductCode, VnpLocale } from 'vnpay';
import { VnpayCallbackDto } from './dto/callback-vnpay.dto';
@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    private vnpayService: VnpayService,
    private configService: ConfigService,
  ) { }

  async createPaymentUrl(createPaymentDto: CreatePaymentDto) {
    try {
      const vnpayURl = this.vnpayService.buildPaymentUrl({
        vnp_TxnRef: createPaymentDto.orderId,
        vnp_Amount: createPaymentDto.amount,
        vnp_IpAddr: '127.0.0.1',
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

  async handleVnpayCallback(callbackDto: VnpayCallbackDto) {
    try{
      if (callbackDto.vnp_ResponseCode === '00') {
        const payment = new this.paymentModel({
          orderId: callbackDto.vnp_TxnRef,
          amount: callbackDto.vnp_Amount,
          transactionId: callbackDto.vnp_TransactionNo,
          responseCode: callbackDto.vnp_ResponseCode,
          message: 'Payment successful',
        });
        console.log('Payment successful:', payment);
        // await payment.save();
        // return { message: 'Payment successful', payment };
      } else {
        // Xử lý thất bại
        return { message: 'Payment failed', responseCode: callbackDto.vnp_ResponseCode };
      }
    } catch (error) {
      console.error('Error handling VNPAY callback:', error);
      throw new Error(`Failed to handle VNPAY callback: ${error.message}`);
    }
  }
  async getBackList() {
    return await this.paymentModel.find().lean();
  }


}
