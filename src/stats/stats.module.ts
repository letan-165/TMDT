import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { Stat, StatSchema } from './schemas/stat.schema';
import { RevenueStat, RevenueStatSchema } from './schemas/revenue-stat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Stat.name, schema: StatSchema },
      { name: RevenueStat.name, schema: RevenueStatSchema }
    ])
  ],
  controllers: [StatsController],
  providers: [StatsService],
  exports: [StatsService],
})
export class StatsModule { }
