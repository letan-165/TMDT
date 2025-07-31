import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStatDto } from './dto/create-stat.dto';
import { UpdateStatDto } from './dto/update-stat.dto';
import { Stat, StatDocument } from './schemas/stat.schema';
import { RevenueStat, RevenueStatDocument } from './schemas/revenue-stat.schema';

@Injectable()
export class StatsService {
  constructor(
    @InjectModel(Stat.name) private statModel: Model<StatDocument>,
    @InjectModel(RevenueStat.name) private revenueStatModel: Model<RevenueStatDocument>,
  ) { }

  async getOverallStats() {
    try {
      let stats = await this.statModel.findOne();

      if (!stats) {
        stats = new this.statModel({});
        await stats.save();
      }

      return {
        success: true,
        data: stats,
        message: 'Lấy thống kê tổng quan thành công',
      };
    } catch (error) {
      throw new Error(`Không thể lấy thống kê tổng quan: ${error.message}`);
    }
  }

  async updateMonthlyRevenue(amount: number, orderCount: number = 1) {
    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;

      const updatedStat = await this.revenueStatModel.findOneAndUpdate(
        { year, month },
        {
          $inc: {
            totalRevenue: amount,
            totalOrders: orderCount
          },
          $set: {
            recordedAt: now
          }
        },
        { upsert: true, new: true }
      );

      // Tính lại average order value
      if (updatedStat.totalOrders > 0) {
        updatedStat.averageOrderValue = updatedStat.totalRevenue / updatedStat.totalOrders;
        await updatedStat.save();
      }

      return {
        success: true,
        data: updatedStat,
        message: 'Cập nhật doanh thu tháng thành công',
      };
    } catch (error) {
      throw new Error(`Không thể cập nhật doanh thu tháng: ${error.message}`);
    }
  }

  async getRevenueByMonth(year: number, month: number) {
    try {
      const revenueStat = await this.revenueStatModel.findOne({ year, month });

      if (!revenueStat) {
        return {
          success: true,
          data: {
            year,
            month,
            totalRevenue: 0,
            totalOrders: 0,
            averageOrderValue: 0,
          },
          message: 'Không có dữ liệu doanh thu cho tháng này',
        };
      }

      return {
        success: true,
        data: revenueStat,
        message: 'Lấy doanh thu theo tháng thành công',
      };
    } catch (error) {
      throw new Error(`Không thể lấy doanh thu theo tháng: ${error.message}`);
    }
  }

  async getRevenueByYear(year: number) {
    try {
      const revenueStats = await this.revenueStatModel
        .find({ year })
        .sort({ month: 1 })
        .exec();

      // Create array for all 12 months
      const monthlyData = Array.from({ length: 12 }, (_, index) => {
        const month = index + 1;
        const existingData = revenueStats.find(stat => stat.month === month);

        return existingData || {
          year,
          month,
          totalRevenue: 0,
          totalOrders: 0,
          averageOrderValue: 0,
        };
      });

      const yearTotal = revenueStats.reduce((total, stat) => total + stat.totalRevenue, 0);
      const yearOrderCount = revenueStats.reduce((total, stat) => total + stat.totalOrders, 0);

      return {
        success: true,
        data: {
          year,
          monthlyData,
          yearSummary: {
            totalRevenue: yearTotal,
            totalOrders: yearOrderCount,
            averageOrderValue: yearOrderCount > 0 ? yearTotal / yearOrderCount : 0,
          }
        },
        message: 'Lấy doanh thu theo năm thành công',
      };
    } catch (error) {
      throw new Error(`Không thể lấy doanh thu theo năm: ${error.message}`);
    }
  }

  async getRevenueRange(fromYear: number, fromMonth: number, toYear: number, toMonth: number) {
    try {
      const revenueStats = await this.revenueStatModel
        .find({
          $or: [
            { year: { $gt: fromYear, $lt: toYear } },
            { year: fromYear, month: { $gte: fromMonth } },
            { year: toYear, month: { $lte: toMonth } }
          ]
        })
        .sort({ year: 1, month: 1 })
        .exec();

      const totalRevenue = revenueStats.reduce((total, stat) => total + stat.totalRevenue, 0);
      const totalOrders = revenueStats.reduce((total, stat) => total + stat.totalOrders, 0);

      return {
        success: true,
        data: {
          revenueStats,
          summary: {
            totalRevenue,
            totalOrders,
            averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
            period: `${fromMonth}/${fromYear} - ${toMonth}/${toYear}`,
          }
        },
        message: 'Lấy doanh thu theo khoảng thời gian thành công',
      };
    } catch (error) {
      throw new Error(`Không thể lấy doanh thu theo khoảng thời gian: ${error.message}`);
    }
  }

  async getTopRevenueMonths(limit: number = 12) {
    try {
      const topMonths = await this.revenueStatModel
        .find({ totalRevenue: { $gt: 0 } })
        .sort({ totalRevenue: -1 })
        .limit(limit)
        .exec();

      return {
        success: true,
        data: topMonths,
        message: 'Lấy top tháng có doanh thu cao nhất thành công',
      };
    } catch (error) {
      throw new Error(`Không thể lấy top tháng có doanh thu cao nhất: ${error.message}`);
    }
  }

  async getDashboardStats() {
    try {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth() + 1;

      // Get overall stats
      const overallStats = await this.statModel.findOne();

      // Get current month revenue
      const currentMonthRevenue = await this.revenueStatModel.findOne({
        year: currentYear,
        month: currentMonth
      });

      // Get current year revenue
      const currentYearRevenue = await this.revenueStatModel
        .find({ year: currentYear })
        .exec();

      const yearTotalRevenue = currentYearRevenue.reduce((total, stat) => total + stat.totalRevenue, 0);
      const yearTotalOrders = currentYearRevenue.reduce((total, stat) => total + stat.totalOrders, 0);

      // Get last 6 months for chart
      const last6Months: any[] = [];
      for (let i = 5; i >= 0; i--) {
        const date = new Date(currentYear, currentMonth - 1 - i, 1);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        const monthData = await this.revenueStatModel.findOne({ year, month });
        last6Months.push({
          year,
          month,
          monthName: date.toLocaleDateString('vi-VN', { month: 'long' }),
          totalRevenue: monthData?.totalRevenue || 0,
          totalOrders: monthData?.totalOrders || 0,
        });
      }

      return {
        success: true,
        data: {
          overview: {
            totalUsers: overallStats?.totalUsers || 0,
            totalProducts: overallStats?.totalProducts || 0,
            totalCategories: overallStats?.totalCategories || 0,
            totalDiscountCodes: overallStats?.totalDiscountCodes || 0,
          },
          revenue: {
            currentMonth: {
              revenue: currentMonthRevenue?.totalRevenue || 0,
              orders: currentMonthRevenue?.totalOrders || 0,
              averageOrderValue: currentMonthRevenue?.averageOrderValue || 0,
            },
            currentYear: {
              revenue: yearTotalRevenue,
              orders: yearTotalOrders,
              averageOrderValue: yearTotalOrders > 0 ? yearTotalRevenue / yearTotalOrders : 0,
            }
          },
          chartData: last6Months,
        },
        message: 'Lấy thống kê dashboard thành công',
      };
    } catch (error) {
      throw new Error(`Không thể lấy thống kê dashboard: ${error.message}`);
    }
  }

  // Utility methods to update counters
  async incrementUserCount() {
    return this.updateCounter('totalUsers', 1);
  }

  async incrementProductCount() {
    return this.updateCounter('totalProducts', 1);
  }

  async decrementProductCount() {
    return this.updateCounter('totalProducts', -1);
  }

  async incrementCategoryCount() {
    return this.updateCounter('totalCategories', 1);
  }

  async decrementCategoryCount() {
    return this.updateCounter('totalCategories', -1);
  }

  async incrementDiscountCodeCount() {
    return this.updateCounter('totalDiscountCodes', 1);
  }

  async decrementDiscountCodeCount() {
    return this.updateCounter('totalDiscountCodes', -1);
  }

  private async updateCounter(field: string, increment: number) {
    try {
      const updateObj = { $inc: { [field]: increment }, $set: { lastUpdated: new Date() } };

      const updatedStats = await this.statModel.findOneAndUpdate(
        {},
        updateObj,
        { upsert: true, new: true }
      );

      return {
        success: true,
        data: updatedStats,
        message: `Cập nhật ${field} thành công`,
      };
    } catch (error) {
      throw new Error(`Không thể cập nhật ${field}: ${error.message}`);
    }
  }

  create(createStatDto: CreateStatDto) {
    return 'This action adds a new stat';
  }

  findAll() {
    return this.getOverallStats();
  }

  findOne(id: number) {
    return `This action returns a #${id} stat`;
  }

  update(id: number, updateStatDto: UpdateStatDto) {
    return `This action updates a #${id} stat`;
  }

  remove(id: number) {
    return `This action removes a #${id} stat`;
  }
}
