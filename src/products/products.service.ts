import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsQueryDto } from './dto/get-products-query.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) { }

  async create(createProductDto: CreateProductDto) {
    try {
      const newProduct = new this.productModel(createProductDto);
      const savedProduct = await newProduct.save();
      // await savedProduct.populate('categoryId', 'name description');
      return savedProduct;
    } catch (error) {
      throw new Error(`Không thể tạo sản phẩm: ${error.message}`);
    }
  }

  async findAll(query: GetProductsQueryDto = {}) {
    try {
      const {
        search,
        categoryId,
        brand,
        minPrice,
        maxPrice,
        isActive,
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        sortOrder = 'desc',
      } = query;

      // Build filter object
      const filter: any = {};

      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { brand: { $regex: search, $options: 'i' } },
        ];
      }

      if (categoryId) {
        filter.category = new Types.ObjectId(categoryId);
      }

      if (brand) {
        filter.brand = { $regex: brand, $options: 'i' };
      }

      if (minPrice !== undefined || maxPrice !== undefined) {
        filter.price = {};
        if (minPrice !== undefined) filter.price.$gte = minPrice;
        if (maxPrice !== undefined) filter.price.$lte = maxPrice;
      }

      if (isActive !== undefined) {
        filter.isActive = isActive;
      }

      // Calculate skip value
      const skip = (page - 1) * limit;

      // Build sort object
      const sort: any = {};
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

      // Execute queries
      const [products, total] = await Promise.all([
        this.productModel
          .find(filter)
          .populate('category', 'name')
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .exec(),
        this.productModel.countDocuments(filter),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        success: true,
        data: {
          products,
          pagination: {
            currentPage: page,
            totalPages,
            totalItems: total,
            itemsPerPage: limit,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
          },
        },
        message: 'Lấy danh sách sản phẩm thành công',
      };
    } catch (error) {
      throw new Error(`Không thể lấy danh sách sản phẩm: ${error.message}`);
    }
  }

  async findOne(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new NotFoundException('ID sản phẩm không hợp lệ');
      }

      const product = await this.productModel
        .findById(id)
        .populate('category', 'name description')
        .exec();

      if (!product) {
        throw new NotFoundException('Không tìm thấy sản phẩm');
      }

      return {
        success: true,
        data: product,
        message: 'Lấy thông tin sản phẩm thành công',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Không thể lấy thông tin sản phẩm: ${error.message}`);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new NotFoundException('ID sản phẩm không hợp lệ');
      }

      const { categoryId, ...updateData } = updateProductDto;

      const updatePayload: any = { ...updateData };
      if (categoryId) {
        updatePayload.category = new Types.ObjectId(categoryId);
      }

      const updatedProduct = await this.productModel
        .findByIdAndUpdate(id, updatePayload, { new: true })
        .populate('category', 'name')
        .exec();

      if (!updatedProduct) {
        throw new NotFoundException('Không tìm thấy sản phẩm');
      }

      return {
        success: true,
        data: updatedProduct,
        message: 'Cập nhật sản phẩm thành công',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Không thể cập nhật sản phẩm: ${error.message}`);
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
        success: true,
        data: { id: deletedProduct._id },
        message: 'Xóa sản phẩm thành công',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Không thể xóa sản phẩm: ${error.message}`);
    }
  }

  // Additional utility methods
  async updateStock(id: string, quantity: number) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new NotFoundException('ID sản phẩm không hợp lệ');
      }

      const product = await this.productModel.findById(id);
      if (!product) {
        throw new NotFoundException('Không tìm thấy sản phẩm');
      }

      if (product.stock + quantity < 0) {
        throw new Error('Số lượng tồn kho không đủ');
      }

      const updatedProduct = await this.productModel
        .findByIdAndUpdate(
          id,
          { $inc: { stock: quantity } },
          { new: true }
        )
        .populate('category', 'name')
        .exec();

      return {
        success: true,
        data: updatedProduct,
        message: 'Cập nhật tồn kho thành công',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Không thể cập nhật tồn kho: ${error.message}`);
    }
  }

  async getProductsByCategory(categoryId: string, limit: number = 10) {
    try {
      if (!Types.ObjectId.isValid(categoryId)) {
        throw new NotFoundException('ID danh mục không hợp lệ');
      }

      const products = await this.productModel
        .find({
          category: new Types.ObjectId(categoryId),
          isActive: true
        })
        .populate('category', 'name')
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec();

      return {
        success: true,
        data: products,
        message: 'Lấy sản phẩm theo danh mục thành công',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Không thể lấy sản phẩm theo danh mục: ${error.message}`);
    }
  }

  // Additional methods for enhanced functionality
  async searchProducts(searchTerm: string, limit: number = 10) {
    try {
      const products = await this.productModel
        .find({
          $and: [
            { isActive: true },
            {
              $or: [
                { name: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } },
                { brand: { $regex: searchTerm, $options: 'i' } },
              ]
            }
          ]
        })
        .populate('category', 'name')
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec();

      return {
        success: true,
        data: products,
        message: 'Tìm kiếm sản phẩm thành công',
      };
    } catch (error) {
      throw new Error(`Không thể tìm kiếm sản phẩm: ${error.message}`);
    }
  }

  async getFeaturedProducts(limit: number = 10) {
    try {
      // Giả sử featured products là những sản phẩm được tạo gần đây và còn hàng
      const products = await this.productModel
        .find({
          isActive: true,
          stock: { $gt: 0 }
        })
        .populate('category', 'name')
        .sort({ createdAt: -1 })
        .limit(limit)
        .exec();

      return {
        success: true,
        data: products,
        message: 'Lấy sản phẩm nổi bật thành công',
      };
    } catch (error) {
      throw new Error(`Không thể lấy sản phẩm nổi bật: ${error.message}`);
    }
  }

  async getLowStockProducts(threshold: number = 10) {
    try {
      const products = await this.productModel
        .find({
          stock: { $lte: threshold, $gte: 0 },
          isActive: true
        })
        .populate('category', 'name')
        .sort({ stock: 1 })
        .exec();

      return {
        success: true,
        data: products,
        message: 'Lấy sản phẩm sắp hết hàng thành công',
      };
    } catch (error) {
      throw new Error(`Không thể lấy sản phẩm sắp hết hàng: ${error.message}`);
    }
  }

  async getRelatedProducts(productId: string, limit: number = 5) {
    try {
      if (!Types.ObjectId.isValid(productId)) {
        throw new NotFoundException('ID sản phẩm không hợp lệ');
      }

      const currentProduct = await this.productModel.findById(productId);
      if (!currentProduct) {
        throw new NotFoundException('Không tìm thấy sản phẩm');
      }

      // Tìm sản phẩm cùng category, loại trừ sản phẩm hiện tại
      const relatedProducts = await this.productModel
        .find({
          //category: currentProduct.category,
          _id: { $ne: productId },
          isActive: true
        })
        .populate('category', 'name')
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec();

      return {
        success: true,
        data: relatedProducts,
        message: 'Lấy sản phẩm liên quan thành công',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Không thể lấy sản phẩm liên quan: ${error.message}`);
    }
  }

  // async updateStockAdvanced(id: string, stockUpdateDto: StockUpdateDto) {
  //   try {
  //     if (!Types.ObjectId.isValid(id)) {
  //       throw new NotFoundException('ID sản phẩm không hợp lệ');
  //     }

  //     const product = await this.productModel.findById(id);
  //     if (!product) {
  //       throw new NotFoundException('Không tìm thấy sản phẩm');
  //     }

  //     let newStock: number;
  //     const { quantity, operation } = stockUpdateDto;

  //     switch (operation) {
  //       case 'increase':
  //         newStock = product.stock + quantity;
  //         break;
  //       case 'decrease':
  //         newStock = product.stock - quantity;
  //         if (newStock < 0) {
  //           throw new Error('Số lượng tồn kho không đủ');
  //         }
  //         break;
  //       case 'set':
  //         newStock = quantity;
  //         if (newStock < 0) {
  //           throw new Error('Số lượng tồn kho không thể âm');
  //         }
  //         break;
  //       default:
  //         throw new Error('Phép toán không hợp lệ');
  //     }

  //     const updatedProduct = await this.productModel
  //       .findByIdAndUpdate(
  //         id,
  //         { stock: newStock },
  //         { new: true }
  //       )
  //       .populate('category', 'name')
  //       .exec();

  //     return {
  //       success: true,
  //       data: updatedProduct,
  //       message: `Cập nhật tồn kho thành công (${operation}: ${quantity})`,
  //     };
  //   } catch (error) {
  //     if (error instanceof NotFoundException) {
  //       throw error;
  //     }
  //     throw new Error(`Không thể cập nhật tồn kho: ${error.message}`);
  //   }
  // }

  async toggleProductStatus(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new NotFoundException('ID sản phẩm không hợp lệ');
      }

      const product = await this.productModel.findById(id);
      if (!product) {
        throw new NotFoundException('Không tìm thấy sản phẩm');
      }

      const updatedProduct = await this.productModel
        .findByIdAndUpdate(
          id,
          //{ isActive: !product.isActive },
          { new: true }
        )
        .populate('category', 'name')
        .exec();

      if (!updatedProduct) {
        throw new Error('Không thể cập nhật trạng thái sản phẩm');
      }

      return {
        success: true,
        data: updatedProduct,
        //message: `Sản phẩm đã được ${updatedProduct.isActive ? 'kích hoạt' : 'vô hiệu hóa'}`,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Không thể thay đổi trạng thái sản phẩm: ${error.message}`);
    }
  }
}
