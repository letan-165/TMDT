import { Injectable } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Discount, DiscountDocument } from './schemas/discount.schema';
import { Model } from 'mongoose';

@Injectable()
export class DiscountService {
  constructor(
    @InjectModel(Discount.name) private discountModel: Model<DiscountDocument>,
  ) {}
  async create(createDiscountDto: CreateDiscountDto) {
    const newDiscount = new this.discountModel(createDiscountDto);
    try {
      const savedDiscount = await newDiscount.save();
      return ({
        success: true,
        data: savedDiscount,
        message: 'Tạo mã giảm giá thành công',
      });
    } catch (error) {
      throw new Error(`Không thể tạo mã giảm giá: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const discounts = await this.discountModel.find();
      return ({
        success: true,
        data: discounts,
        message: 'Lấy danh sách mã giảm giá thành công',
      });
    } catch (error) {
      throw new Error(`Không thể lấy danh sách mã giảm giá: ${error.message}`);
    }
  }

  async findOne(id: string) {
    try {
      const discount = await this.discountModel.findById(id);
      if (!discount) {
        throw new Error(`Không tìm thấy mã giảm giá với ID ${id}`);
      }
      return {
        success: true,
        data: discount,
        message: 'Lấy thông tin mã giảm giá thành công',
      };
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
      return {
        success: true,
        data: updatedDiscount,
        message: 'Cập nhật mã giảm giá thành công',
      };
    } catch (error) {
      throw new Error(`Không thể cập nhật mã giảm giá: ${error.message}`);
    }
  }

  async remove(id: string) {
    try {
      const deletedDiscount = await this.discountModel.findByIdAndDelete(id);
      if (!deletedDiscount) {
        throw new Error(`Không tìm thấy mã giảm giá với ID ${id}`);
      }
      return {
        success: true,
        data: deletedDiscount,
        message: 'Xóa mã giảm giá thành công',
      };
    } catch (error) {
      throw new Error(`Không thể xóa mã giảm giá: ${error.message}`);
    }
  }
}
