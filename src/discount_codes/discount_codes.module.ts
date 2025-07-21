import { Module } from '@nestjs/common';
import { DiscountCodesService } from './discount_codes.service';
import { DiscountCodesController } from './discount_codes.controller';

@Module({
  controllers: [DiscountCodesController],
  providers: [DiscountCodesService],
})
export class DiscountCodesModule {}
