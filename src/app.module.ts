import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'process';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { OrderDetailsModule } from './order_details/order_details.module';
import { ReviewsModule } from './reviews/reviews.module';
import { DiscountCodesModule } from './discount_codes/discount_codes.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('MONGODB_URI'),
    }),
    inject: [ConfigService],
  }),
  UsersModule,
  ProductsModule,
  CategoriesModule,
  OrdersModule,
  OrderDetailsModule,
  ReviewsModule,
  DiscountCodesModule,
  StatsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
