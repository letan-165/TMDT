import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class CartsService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
  ) { }
  async create(createCartDto: CreateCartDto) {
    const { userId, items } = createCartDto;
    try {
      const existingCart = await this.cartModel.findOne({ userId: userId });
      if (existingCart) {
        for (const item of items) {
          const productIdObj = new Types.ObjectId(item.productId);
          const existingItem = existingCart.items.findIndex((cartItem) => cartItem.productId.toString() === item.productId.toString());
          if (existingItem !== -1) {
            existingCart.items[existingItem].quantity += item.quantity;
          } else {
            existingCart.items.push({
              productId: productIdObj,
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

  async findAll() {
    try {
      return await this.cartModel.find().populate('items.productId');
    } catch (error) {
      throw new Error('Error finding all carts');
    }
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

  async findCartByUserId(userId: string){
    try {
      const cart = await this.cartModel.findOne({ userId}).populate('items.productId');
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
      const cart = await this.cartModel.findById(id);
      if (!cart) {
        throw new Error(`Cart with ID ${id} not found`);
      }
      const { items } = updateCartDto;
      for (const item of items) {
        const productIdObj = new Types.ObjectId(item.productId);
        const existingItemIndex = cart.items.findIndex((cartItem) => cartItem.productId.toString() === item.productId.toString());
        if (existingItemIndex !== -1) {
          cart.items[existingItemIndex].quantity = item.quantity;
        } else {
          cart.items.push({
            productId: productIdObj,
            quantity: item.quantity
          });
        }
      }
      return await cart.save();
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
