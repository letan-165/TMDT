import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { Model, Types } from 'mongoose';
import aqp from 'api-query-params';
import { StoreService } from '@/store/store.service';

@Injectable()
export class CartsService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    //private storeService: StoreService
  ) { }
  async create(createCartDto: CreateCartDto) {
    const { userId, items } = createCartDto;
    try {
      const existingCart = await this.cartModel.findOne({ userId: userId });
      if (existingCart) {
        for (const item of items) {
          const existingItem = existingCart.items.findIndex((cartItem) => cartItem.productId.toString() === item.productId.toString());
          if (existingItem !== -1) {
            existingCart.items[existingItem].quantity += item.quantity;
          } else {
            existingCart.items.push({
              productId: new Types.ObjectId(item.productId),
              quantity: item.quantity
            });
          }
        }
        return existingCart.save();
      }
      const newCart = new this.cartModel(createCartDto);
      return newCart.save();
    } catch (error) {
      throw new Error('Error creating cart');
    }
  }

  async findAll(query: string, current: number, pageSize: number) {
    const { filter, sort } = aqp(query);
    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;
    if (!current) current = 1;
    if (!pageSize) pageSize = 10;
    const totalItems = await this.cartModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (current - 1) * pageSize;
    const carts = await this.cartModel.find(filter).sort(sort as any).skip(skip).limit(pageSize).populate('items.productId').lean();
    for (const cart of carts) {
      await cart.populate('items.productId', 'name price');
      //const store = await this.storeService.findByUserId(cart.userId.toString());
      
    }
    return { carts, totalPages };
  }

  async findOne(id: string) {
    try {
      const cart = await this.cartModel.findById(id).populate('items.productId');
      if (!cart) {
        throw new Error(`Cart with ID ${id} not found`);
      }
      return cart;
    } catch (error) {
      throw new Error('Error finding cart');
    }
  }

  async findCartByUserId(userId: string) {
    try {
      if (!Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid user ID');
      }
      const cart = await this.cartModel.findOne({ userId }).populate('items.productId', 'name price');
      if (!cart) {
        throw new Error(`Cart for user with ID ${userId} not found`);
      }
      return cart;
    } catch (error) {
      throw new Error('Error finding cart');
    }
  }
  async update(id: string, updateCartDto: UpdateCartDto) {
    try {
      const updatedCart = await this.cartModel.findByIdAndUpdate(id, updateCartDto, { new: true });
      if (!updatedCart) {
        throw new Error(`Cart with ID ${id} not found`);
      }
      return updatedCart;
    } catch (error) {
      throw new Error('Error updating cart');
    }
  }

  async removeProductFromCart(cartId: string, productId: string) {
    try {
      const cart = await this.cartModel.findById(cartId);
      if (!cart) {
        throw new Error(`Cart with ID ${cartId} not found`);
      }
      cart.items = cart.items.filter(item => item.productId.toString() !== productId.toString());
      return await cart.save();
    } catch (error) {
      throw new Error('Error deleting product from cart');
    }
  }



}
