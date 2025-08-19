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

  
  async calculateFinalPrice(price: number, discountId?: string) {
    if (!discountId) return price;

    const discount = await this.discountModel.findById(discountId);
    if (!discount) 
      throw new Error('Không tìm thấy mã giảm giá');
    return price - (price * discount.value) / 100;
  }

  async findOneBySeller(sellerId: string) {
    try {
      const discounts = await this.discountModel.findOne({ createdBy: sellerId }).lean()
      if (!discounts) {
        throw new Error(`Không tìm thấy mã giảm giá cho người bán với ID ${sellerId}`);
      }
      return discounts;
    } catch (error) {
      throw new Error(`Không thể lấy thông tin mã giảm giá: ${error.message}`);
    }
  }

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
