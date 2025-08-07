import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import aqp from 'api-query-params';
import { UpdateProductSellerDto } from './dto/update-product-seller.dto';
import { OrderItem } from '@/orders/dto/create-order.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) { }

  async create(createProductDto: CreateProductDto) {
    try {
      const newProduct = new this.productModel(createProductDto);
      const savedProduct = await newProduct.save();
      await savedProduct.populate('categoryId', 'name description');
      return savedProduct;
    } catch (error) {
      throw new Error(`Không thể tạo sản phẩm: ${error.message}`);
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
    const totalItems = await this.productModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (current - 1) * pageSize;
    const products = await this.productModel.find(filter)
      .sort(sort as any)
      .skip(skip)
      .limit(pageSize)
      .populate('categoryId', 'name description').lean();
    return { products, totalPages };
  }

  async findOne(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new Error('ID sản phẩm không hợp lệ');
      }
      const product = await this.productModel.findById(id);
      if (!product) {
        throw new Error('Không tìm thấy sản phẩm');
      }
      return product;
    } catch (error) {
      throw new Error(`Không thể tìm sản phẩm: ${error.message}`);
    }
  }

  async findOneBySeller(sellerId: string) {
    try {
      if (!Types.ObjectId.isValid(sellerId)) {
        throw new NotFoundException('ID người bán không hợp lệ');
      }
      const products = await this.productModel.find({ sellerId }).populate('categoryId', 'name description').lean();
      if (!products) {
        throw new NotFoundException('Không có sản phẩm nào của người bán này');
      }
      return products;
    } catch (error) {
      throw new Error(`Không thể tìm sản phẩm theo người bán: ${error.message}`);
    }
  }

  async updateProductAdmin(id: string, updateProductDto: UpdateProductSellerDto) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new NotFoundException('ID sản phẩm không hợp lệ');
      }
      const updatedProduct = await this.productModel.findByIdAndUpdate(
        id, updateProductDto, { new: true }
      ).populate('categoryId', 'name description').exec();

      if (!updatedProduct) {
        throw new NotFoundException('Không tìm thấy sản phẩm');
      }

      return updatedProduct;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Không thể cập nhật sản phẩm: ${error.message}`);
    }
  }

  async updateProductSeller(id: string, updateProductDto: UpdateProductDto) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new NotFoundException('ID sản phẩm không hợp lệ');
      }

      const updatedProduct = await this.productModel.findByIdAndUpdate(
        id, updateProductDto, { new: true }
      ).populate('categoryId', 'name description').exec();
      if (!updatedProduct) {
        throw new NotFoundException('Không tìm thấy sản phẩm');
      }
      return updatedProduct;
    }
    catch (error) {
      throw new Error(`Không thể cập nhật sản phẩm: ${error.message}`);
    }
  }

  async decreaseStock(
    items: { productId: string; quantity: number }[],
    session?: ClientSession,
  ) {
    const updatedProducts: string[] = [];

    for (const item of items) {
      if (!Types.ObjectId.isValid(item.productId)) {
        throw new BadRequestException(`ID sản phẩm không hợp lệ: ${item.productId}`);
      }
      const res = await this.productModel.updateOne(
        { _id: item.productId, stock: { $gte: item.quantity } },
        {
          $inc: { stock: -item.quantity },
          $set: { lastStockUpdate: new Date() },
        },
        session ? { session } : {},
      );
      if (res.modifiedCount === 0) {
        throw new BadRequestException(`Không đủ hàng trong kho cho sản phẩm ${item.productId}`);
      }
      updatedProducts.push(item.productId);
    }

    return updatedProducts;
  }

  async groupProductsBySeller(items: OrderItem[]) {
    const products = await this.productModel.find({ _id: { $in: items.map(item => item.productId) } })
    const itemsBySeller = new Map();

    products.forEach(product => {
      const sellerId = product.sellerId.toString();
      if (!itemsBySeller.has(sellerId)) {
        itemsBySeller.set(sellerId, []);
      }
      itemsBySeller.get(sellerId).push(product);
    });
    return itemsBySeller;
  }

  async remove(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new NotFoundException('ID sản phẩm không hợp lệ');
      }

      const deletedProduct = await this.productModel
        .findByIdAndDelete(id)
        .exec();

      if (!deletedProduct) {
        throw new NotFoundException('Không tìm thấy sản phẩm');
      }

      return {
        message: 'Xóa sản phẩm thành công',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Không thể xóa sản phẩm: ${error.message}`);
    }
  }
}
