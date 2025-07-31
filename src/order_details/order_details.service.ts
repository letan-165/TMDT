import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
import { OrderDetail, OrderDetailDocument } from './schemas/order_detail.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectModel(OrderDetail.name) private orderDetailModel: Model<OrderDetailDocument>,
  ) {}

  async create(createOrderDetailDto: CreateOrderDetailDto): Promise<OrderDetail> {
    const createdOrderDetail = new this.orderDetailModel(createOrderDetailDto);
    return await createdOrderDetail.save();
  }

  async findAll(): Promise<OrderDetail[]> {
    return await this.orderDetailModel.find().exec();
  }

  async findOne(id: string): Promise<OrderDetail | null> {
    return await this.orderDetailModel.findById(id).exec();
  }

  async update(id: string, updateOrderDetailDto: UpdateOrderDetailDto): Promise<OrderDetail | null> {
    return await this.orderDetailModel.findByIdAndUpdate(id, updateOrderDetailDto, { new: true }).exec();
  }

  async remove(id: string): Promise<OrderDetail | null> {
    return await this.orderDetailModel.findByIdAndDelete(id).exec();
  }
}


