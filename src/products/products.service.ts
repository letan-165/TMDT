import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import aqp from 'api-query-params';
import { DiscountService } from '@/discount/discount.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private discountService: DiscountService,
  ) { }

  async create(createProductDto: CreateProductDto) {
    try {
      const newProduct = new this.productModel(createProductDto);
      const finalPrice = await this.discountService.calculateFinalPrice(newProduct.price, createProductDto.discountId);
      if (finalPrice < newProduct.price) {
        newProduct.finalPrice = finalPrice;
        newProduct.haveDiscount = true;
      }
      else {
        newProduct.finalPrice = newProduct.price;
        newProduct.haveDiscount = false;
      }
      await newProduct.save();
      await newProduct.populate('categoryId', 'name description');
      await newProduct.populate('discountId', 'code value');
      return newProduct;
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
      .populate('categoryId', 'name description').populate('discountId', 'code value').lean();
    return { products, totalPages };
  }

  async findOne(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new Error('ID sản phẩm không hợp lệ');
      }
      const product = await this.productModel.findById(id).populate('categoryId', 'name description').populate('discountId', 'code value');
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

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new NotFoundException('ID sản phẩm không hợp lệ');
      }
      const finalPrice = await this.discountService.calculateFinalPrice(updateProductDto.price!, updateProductDto.discountId);
      const updatedProduct = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true });
      if (!updatedProduct) {
        throw new NotFoundException('Không tìm thấy sản phẩm');
      }
      if (finalPrice < updatedProduct.price) {
        updatedProduct.finalPrice = finalPrice;
        updatedProduct.haveDiscount = true;
      } else {
        updatedProduct.finalPrice = updatedProduct.price;
        updatedProduct.haveDiscount = false;
      }
      await updatedProduct.save();
      await updatedProduct.populate('categoryId', 'name description');
      await updatedProduct.populate('discountId', 'code value');
      return updatedProduct;
    }
    catch (error) {
      throw new Error(`Không thể cập nhật sản phẩm: ${error.message}`);
    }
  }

  async removeDiscountFromProduct(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new NotFoundException('ID sản phẩm không hợp lệ');
      }

      const product = await this.productModel.findById(id);
      if (!product) {
        throw new NotFoundException('Không tìm thấy sản phẩm');
      }

      product.discountId = undefined;
      product.finalPrice = product.price;
      await product.save();
      return {
        message: 'xóa discount thành công'
      }
    } catch (error) {
      throw new Error(`Không thể xóa discount: ${error.message}`);
    }
  }

  async updateStatus(id: string, status: boolean) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new NotFoundException('ID sản phẩm không hợp lệ');
      }
      const updatedProduct = await this.productModel.findByIdAndUpdate(id, { status }, { new: true }).populate('categoryId', 'name description').populate('discountId', 'code value');
      if (!updatedProduct) {
        throw new NotFoundException('Không tìm thấy sản phẩm');
      }
      return updatedProduct;
    } catch (error) {
      throw new Error(`Không thể cập nhật trạng thái sản phẩm: ${error.message}`);
    }
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
      throw new Error(`Không thể xóa sản phẩm: ${error.message}`);
    }
  }
}
