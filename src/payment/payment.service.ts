import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Payment, PaymentDocument } from './schemas/payment.schema';
import { Model, Types } from 'mongoose';
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
      // 1. Tạo payment record trước để có ID ngắn gọn
      const payment = new this.paymentModel({
        orderIds: createPaymentDto.orderIds.map(id => new Types.ObjectId(id)),
        amount: createPaymentDto.amount,
        txnRef: this.generateTxnRef(),
        status: 'PENDING',
        ipAddr: createPaymentDto.ipAddr || '127.0.0.1'
      });

      const savedPayment = await payment.save();
      console.log('Created payment record:', savedPayment._id);

      // 2. Dùng payment._id làm vnp_TxnRef (ngắn gọn hơn)
      const vnpayUrl = this.vnpayService.buildPaymentUrl({
        vnp_TxnRef: savedPayment._id.toString(),
        vnp_Amount: createPaymentDto.amount,
        vnp_IpAddr: createPaymentDto.ipAddr || '127.0.0.1',
        vnp_ReturnUrl: this.configService.get<string>('VNPAY_RETURN_URL')!,
        vnp_OrderInfo: `Thanh toan ${createPaymentDto.orderIds.length} don hang #${savedPayment._id}`,
        vnp_Locale: VnpLocale.VN,
        vnp_OrderType: ProductCode.Other,
      });

      // 3. Update payment với vnpayUrl để debug
      await this.paymentModel.findByIdAndUpdate(savedPayment._id, {
        vnpayUrl: vnpayUrl
      });

      return {
        paymentId: savedPayment._id,
        paymentUrl: vnpayUrl,
        orderIds: createPaymentDto.orderIds,
        amount: createPaymentDto.amount,
        txnRef: savedPayment.txnRef
      };

    } catch (error) {
      console.error('Error creating payment URL:', error);
      throw new Error(`Failed to create payment URL: ${error.message}`);
    }
  }

  async handleVnpayCallback(callbackDto: VnpayCallbackDto) {
    try {
      // vnp_TxnRef chính là paymentId
      const paymentId = callbackDto.vnp_TxnRef;
      console.log('Processing VNPAY callback for payment:', paymentId);

      // Tìm payment record
      const payment = await this.paymentModel.findById(paymentId).populate('orderIds');
      if (!payment) {
        throw new Error(`Payment not found: ${paymentId}`);
      }

      if (callbackDto.vnp_ResponseCode === '00') {
        // Payment thành công - update payment record
        const updatedPayment = await this.paymentModel.findByIdAndUpdate(
          paymentId,
          {
            status: 'SUCCESS',
            transactionId: callbackDto.vnp_TransactionNo,
            responseCode: callbackDto.vnp_ResponseCode,
            message: 'Payment successful',
            paidAt: new Date(),
            bankCode: callbackDto.vnp_BankCode
          },
          { new: true }
        ).populate('orderIds');

        console.log('Payment successful:', updatedPayment);

        // TODO: Update orders status - cần inject OrderService hoặc emit event
        console.log(`Should update orders ${payment.orderIds} to PAID status`);

        return {
          success: true,
          message: 'Payment successful',
          payment: updatedPayment,
          orderIds: payment.orderIds,
          transactionId: callbackDto.vnp_TransactionNo
        };

      } else {
        // Payment thất bại
        const updatedPayment = await this.paymentModel.findByIdAndUpdate(
          paymentId,
          {
            status: 'FAILED',
            responseCode: callbackDto.vnp_ResponseCode,
            message: 'Payment failed',
            bankCode: callbackDto.vnp_BankCode
          },
          { new: true }
        );

        console.log(`Should update orders ${payment.orderIds} to FAILED status`);

        return {
          success: false,
          message: 'Payment failed',
          responseCode: callbackDto.vnp_ResponseCode,
          orderIds: payment.orderIds
        };
      }

    } catch (error) {
      console.error('Error handling VNPAY callback:', error);
      throw new Error(`Failed to handle VNPAY callback: ${error.message}`);
    }
  }

  async getPaymentList() {
    try {
      return await this.paymentModel.find()
        .populate('orderIds', 'totalAmount status createdAt')
        .sort({ createdAt: -1 })
        .lean();
    } catch (error) {
      throw new Error(`Failed to get payment list: ${error.message}`);
    }
  }

  async getPaymentById(paymentId: string) {
    try {
      if (!Types.ObjectId.isValid(paymentId)) {
        throw new Error('Invalid payment ID');
      }

      const payment = await this.paymentModel.findById(paymentId)
        .populate('orderIds', 'totalAmount status items createdAt')
        .lean();

      if (!payment) {
        throw new Error(`Payment not found: ${paymentId}`);
      }

      return payment;
    } catch (error) {
      throw new Error(`Failed to get payment: ${error.message}`);
    }
  }

  async getPaymentsByOrderIds(orderIds: string[]) {
    try {
      const objectIds = orderIds.map(id => new Types.ObjectId(id));

      const payments = await this.paymentModel.find({
        orderIds: { $in: objectIds }
      }).populate('orderIds', 'totalAmount status').lean();

      return payments;
    } catch (error) {
      throw new Error(`Failed to get payments by order IDs: ${error.message}`);
    }
  }

  async cancelPayment(paymentId: string) {
    try {
      const updatedPayment = await this.paymentModel.findByIdAndUpdate(
        paymentId,
        {
          status: 'CANCELLED',
          message: 'Payment cancelled by user'
        },
        { new: true }
      );

      if (!updatedPayment) {
        throw new Error(`Payment not found: ${paymentId}`);
      }

      return updatedPayment;
    } catch (error) {
      throw new Error(`Failed to cancel payment: ${error.message}`);
    }
  }

  private generateTxnRef(): string {
    // Tạo unique transaction reference ngắn gọn
    const timestamp = Date.now().toString().slice(-8); // 8 số cuối của timestamp
    const random = Math.random().toString(36).substring(2, 6).toUpperCase(); // 4 ký tự random
    return `PAY${timestamp}${random}`;
  }

  // Legacy method để tương thích
  async getBackList() {
    return this.getPaymentList();
  }
}
