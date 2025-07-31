import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './schemas/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(createOrderDto);
    return await createdOrder.save();
  }

  async findAll(): Promise<Order[]> {
    return await this.orderModel.find().populate('userId').exec();
  }

  async findOne(id: string): Promise<Order | null> {
    return await this.orderModel.findById(id).populate('userId').exec();
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order | null> {
    return await this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Order | null> {
    return await this.orderModel.findByIdAndDelete(id).exec();
  }
  async findOrdersByUserId(userId: string): Promise<Order[]> {
    return await this.orderModel.find({ userId }).populate('userId').exec();
  }

  async findOrderDetailsByOrderId(orderId: string): Promise<Order | null> {
    return await this.orderModel.findById(orderId).populate('orderDetails').exec();
  }

}


