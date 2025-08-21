import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductsService } from '@/products/products.service';
import { Order, OrderDocument } from './schemas/order.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { OrderStatus } from './enum/status.enum';
import { UpdateOrderDto } from './dto/update-order.dto';
import aqp from 'api-query-params';
import { PaymentService } from '@/payment/payment.service';


@Injectable()
export class OrdersService {
  constructor(
    private productService: ProductsService,
    private paymentService: PaymentService,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    const { userId, items } = createOrderDto;
    try {
      // Nhóm items theo sellerId
      const itemsBySeller = new Map<string, any[]>();
      for (const item of items) {
        const product = await this.productService.findOne(item.productId);
        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }
        if (product.stock < item.quantity) {
          throw new Error(`Sản phẩm ${product.name} không đủ số lượng`);
        }

        const sellerId = product.sellerId._id.toString(); 

        if (!itemsBySeller.has(sellerId)) {
          itemsBySeller.set(sellerId, []);
        }
        itemsBySeller.get(sellerId)!.push({productId: product._id, quantity: item.quantity, price: product.finalPrice});
      }
      // Tạo order riêng cho mỗi seller
      const orders: OrderDocument[] = [];
      for (const [sellerId, sellerItems] of itemsBySeller) {
        const totalAmount = sellerItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const order = new this.orderModel({
          userId,
          sellerId: sellerId,
          items: sellerItems,
          totalAmount,
          status: OrderStatus.PENDING,
        });
        orders.push(order);
      }
      // Gọi service xử lý thanh toán VNPAY
      // Truyền thông tin đơn hàng và nhận về url thanh toán hoặc kết quả
      // Lưu tất cả orders
      const savedOrders = await this.orderModel.insertMany(orders);

      // Tính tổng amount của tất cả
      const totalPaymentAmount = savedOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      
      // Tạo 1 payment URL duy nhất cho tất cả orders
      const orderIds = savedOrders.map(order => order._id.toString());
      const paymentUrl = await this.paymentService.createPaymentUrl({ 
        orderIds: orderIds, 
        amount: totalPaymentAmount 
      });
      
      return { orders: savedOrders, paymentUrl };
    } catch (error) {
      console.error('Error creating order:', error);
    }
  }


updateStatus(id: string, updateOrderDto: UpdateOrderDto) {
  try {
    console.log('Updating order status:', id, updateOrderDto);
    return this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true }).populate('userId', 'name email').populate('sellerId', 'name email').populate('items.productId', 'name price');
  } catch (error) {
    console.error('Error updating order status:', error);
  }
}

  async findOne(id: string) {
  try {
    const order = await this.orderModel.findById(id)
      .populate('userId', 'name email')
      .populate('sellerId', 'name email')
      .populate('items.productId', 'name price')

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

  async findOrdersByUserId(userId: string) {
  try {
    const orders = await this.orderModel.find({ userId }).populate('items.productId', 'name');
    return orders;
  } catch (error) {
    throw new Error(`Failed to get orders for user ${userId}: ${error.message}`);
  }
}

  async findOrdersBySellerId(sellerId: string) {
  try {
    const orders = await this.orderModel.find({ sellerId }).populate('items.productId', 'name');
    return orders;
  } catch (error) {
    throw new Error(`Failed to get orders for seller ${sellerId}: ${error.message}`);
  }
}
}
