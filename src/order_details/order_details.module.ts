import { Module } from '@nestjs/common';
import { OrderDetailsService } from './order_details.service';
import { OrderDetailsController } from './order_details.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderDetail, OrderDetailSchema } from './schemas/order_detail.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: OrderDetail.name, schema: OrderDetailSchema}])],
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService],
})
export class OrderDetailsModule {}
