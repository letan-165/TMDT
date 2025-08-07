import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './schemas/payment.schema';
import { VnpayModule } from 'nestjs-vnpay';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HashAlgorithm } from 'vnpay';
import { OrdersModule } from '@/orders/orders.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    VnpayModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secureSecret: configService.getOrThrow<string>('VNPAY_SECURE_SECRET'),
        tmnCode: configService.getOrThrow<string>('VNPAY_TMN_CODE'),
        hashAlgorithm: HashAlgorithm.SHA512,
        testMode: true, 
      }),
      inject: [ConfigService],
    }),
    OrdersModule,

  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule { }
