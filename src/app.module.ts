import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { OrderDetailsModule } from './order_details/order_details.module';

import { StatsModule } from './stats/stats.module';
import { AuthModule } from './auth/auth.module';
import { SendMailModule } from './send-mail/send-mail.module';
import { CartsModule } from './carts/carts.module';

import { DiscountModule } from './discount/discount.module';
import { PaymentModule } from './payment/payment.module';
import { RolesGuard } from './auth/guard/role.guard';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'), dbName: 'TMDT',
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ProductsModule,
    CategoriesModule,
    OrdersModule,
    OrderDetailsModule,
    StatsModule,
    AuthModule,
    SendMailModule,
    CartsModule,
    DiscountModule,
    PaymentModule,
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          // ignoreTLS: true,
          secure: true,
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASSWORD'),
          },
        }, 
        defaults: {
          from: `${configService.get<string>('BRAND_NAME')} <no-reply@localhost>`
        },
        //preview: true,
        template: {
          dir: join(__dirname, 'send-mail/templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }), inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,{
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },{
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
})
export class AppModule { }
