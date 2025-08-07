import { Injectable } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Discount, DiscountDocument } from './schemas/discount.schema';
import { Model, Types } from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class DiscountService {
  constructor(
    @InjectModel(Discount.name) private discountModel: Model<DiscountDocument>,
  ) { }
  async create(createDiscountDto: CreateDiscountDto) {
    const newDiscount = new this.discountModel(createDiscountDto);
    try {
      const savedDiscount = await newDiscount.save();
      return savedDiscount;
    } catch (error) {
      throw new Error(`Không thể tạo mã giảm giá: ${error.message}`);
    }
  }

  async findAll(query: string, current: number, pageSize: number) {
    const { filter, sort } = aqp(query);
    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;
    if (!current) {
      current = 1;
    }
    if (!pageSize) {
      pageSize = 10;
    }
    const totalItems = await this.discountModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (current - 1) * pageSize;
    const discounts = await this.discountModel.find(filter)
      .sort(sort as any)
      .skip(skip)
      .limit(pageSize)
      .populate('createdBy', 'name email')
      .lean();
    return { discounts, totalPages };
  }

  async findOne(id: string) {
    try {
      const discount = await this.discountModel.findById(id).lean();
      if (!discount) {
        throw new Error(`Không tìm thấy mã giảm giá với ID ${id}`);
      }
      return discount;
    } catch (error) {
      throw new Error(`Không thể lấy thông tin mã giảm giá: ${error.message}`);
    }
  }

  // Method đơn giản để áp dụng discount
  // async applyDiscount(discountCode: string, sellerId: string, totalAmount: number) {
  //   try {
  //     // Tìm discount theo code và sellerId
  //     const discount = await this.discountModel.findOne({
  //       code: discountCode,
  //       sellerId: sellerId
  //     }).lean();

  //     // Nếu không tìm thấy, trả về không có discount
  //     if (!discount) {
  //       return {
  //         success: false,
  //         discountAmount: 0,
  //         finalAmount: totalAmount,
  //         message: 'Mã giảm giá không tồn tại'
  //       };
  //     }

  //     // Tính discount amount đơn giản
  //     let discountAmount = 0;
  //     if (discount.type === 'fixed') {
  //       discountAmount = Math.min(discount.value, totalAmount);
  //     } else if (discount.type === 'percentage') {
  //       discountAmount = (totalAmount * discount.value) / 100;
  //       if (discount.maxDiscount && discountAmount > discount.maxDiscount) {
  //         discountAmount = discount.maxDiscount;
  //       }
  //     }

  //     const finalAmount = totalAmount - discountAmount;

  //     return {
  //       success: true,
  //       discountId: discount._id,
  //       discountCode: discount.code,
  //       discountAmount: discountAmount,
  //       finalAmount: finalAmount,
  //       message: 'Áp dụng mã giảm giá thành công'
  //     };

  //   } catch (error) {
  //     console.error('Error applying discount:', error);
  //     return {
  //       success: false,
  //       discountAmount: 0,
  //       finalAmount: totalAmount,
  //       message: 'Có lỗi khi áp dụng mã giảm giá'
  //     };
  //   }
  // }

  async update(id: string, updateDiscountDto: UpdateDiscountDto) {
    try {
      const updatedDiscount = await this.discountModel.findByIdAndUpdate(id, updateDiscountDto, { new: true });
      if (!updatedDiscount) {
        throw new Error(`Không tìm thấy mã giảm giá với ID ${id}`);
      }
      return updatedDiscount;
    } catch (error) {
      throw new Error(`Không thể cập nhật mã giảm giá: ${error.message}`);
    }
  }

  async remove(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new Error('ID không hợp lệ');
      }
      const deletedDiscount = await this.discountModel.findByIdAndDelete(id);
      if (!deletedDiscount) {
        throw new Error(`Không tìm thấy mã giảm giá với ID ${id}`);
      }
      return {
        message: 'Xóa mã giảm giá thành công',
      };
    } catch (error) {
      throw new Error(`Không thể xóa mã giảm giá: ${error.message}`);
    }
  }
}
