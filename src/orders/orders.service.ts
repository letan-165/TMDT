import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductsService } from '@/products/products.service';
import { Order, OrderDocument } from './schemas/order.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { OrderStatus } from './enum/status.enum';
import { UpdateOrderDto } from './dto/update-order.dto';
import { SendMailService } from '@/send-mail/send-mail.service';
import { DiscountService } from '@/discount/discount.service';
import aqp from 'api-query-params';

@Injectable()
export class OrdersService {
  constructor(
    private productService: ProductsService,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    const { userId, sellerId, items, discountCode } = createOrderDto;
    try {
      // Kiểm tra stock sản phẩm
      for (const item of items) {
        const product = await this.productService.findOne(item.productId);
        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }
        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for product ${product.name}`);
        }
      }

      const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

      let orderData: any = {
        userId,
        sellerId,
        items,
        totalAmount,
        status: OrderStatus.PENDING,
        
      };
  
      const order = new this.orderModel(orderData);
      const savedOrder = await order.save();

      await savedOrder.populate('userId', 'name');
      await savedOrder.populate('sellerId', 'name');
      await savedOrder.populate('items.productId', 'name price');

      return savedOrder;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }

  updateStatus(id: string, updateOrderDto: UpdateOrderDto) {
    return this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true });
  }

  async findOne(id: string) {
    try {
      const order = await this.orderModel.findById(id)
        .populate('userId', 'name email')
        .populate('sellerId', 'name email')
        .populate('items.productId', 'name price')
        .populate('discountId', 'code name value');

      if (!order) {
        throw new Error(`Order with ID ${id} not found`);
      }

      return order;
    } catch (error) {
      throw new Error(`Failed to get order: ${error.message}`);
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
    const totalItems = await this.orderModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (current - 1) * pageSize;

    const orders = await this.orderModel.find(filter)
      .sort(sort as any)
      .skip(skip)
      .limit(pageSize)
      .populate('userId', 'name email')
      .populate('sellerId', 'name email')
      .populate('items.productId', 'name price')
      .populate('discountId', 'code name value')
      .lean();

    return { orders, totalPages };
  }

  async remove(id: string) {
    try {
      const order = await this.orderModel.findByIdAndDelete(id);
      if (!order) {
        throw new Error(`Order with ID ${id} not found`);
      }
      return { message: 'Order deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete order: ${error.message}`);
    }
  }
}
