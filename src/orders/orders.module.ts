import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { ProductsModule } from '@/products/products.module';
import { SendMailModule } from '@/send-mail/send-mail.module';
import { DiscountModule } from '@/discount/discount.module';
import { PaymentModule } from '@/payment/payment.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ProductsModule,
    SendMailModule,
    DiscountModule,
    PaymentModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule { }
