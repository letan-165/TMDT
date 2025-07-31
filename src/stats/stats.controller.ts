import { Controller, Get, Query, Param } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) { }

  @Get()
  getOverallStats() {
    return this.statsService.getOverallStats();
  }

  @Get('dashboard')
  getDashboardStats() {
    return this.statsService.getDashboardStats();
  }

  @Get('revenue/month/:year/:month')
  getRevenueByMonth(
    @Param('year') year: number,
    @Param('month') month: number
  ) {
    return this.statsService.getRevenueByMonth(+year, +month);
  }

  @Get('revenue/year/:year')
  getRevenueByYear(@Param('year') year: number) {
    return this.statsService.getRevenueByYear(+year);
  }

  @Get('revenue/range')
  getRevenueRange(
    @Query('fromYear') fromYear: number,
    @Query('fromMonth') fromMonth: number,
    @Query('toYear') toYear: number,
    @Query('toMonth') toMonth: number
  ) {
    return this.statsService.getRevenueRange(+fromYear, +fromMonth, +toYear, +toMonth);
  }

  @Get('revenue/top')
  getTopRevenueMonths(@Query('limit') limit: number = 12) {
    return this.statsService.getTopRevenueMonths(+limit);
  }
}
