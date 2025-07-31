import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const newCategory = new this.categoryModel({createCategoryDto});

      const savedCategory = await newCategory.save();

      return {
        success: true,
        data: savedCategory,
        message: 'Tạo danh mục thành công',
      };
    } catch (error) {
      
    }
  }

  async findAll() {
    try {
      const categories = await this.categoryModel
        .find()
        .sort({ createdAt: -1 })
        .exec();

      return {
        success: true,
        data: categories,
        message: 'Lấy danh sách danh mục thành công',
      };
    } catch (error) {
      throw new Error(`Không thể lấy danh sách danh mục: ${error.message}`);
    }
  }

  async findAllByTag(tag: string) {
    try {
      const categories = await this.categoryModel
        .find({ tags: tag })
        .sort({ createdAt: -1 })
        .exec();

      return {
        success: true,
        data: categories,
        message: 'Lấy danh sách danh mục theo thẻ thành công',
      };
    }
    catch (error) {
      throw new Error(`Không thể lấy danh sách danh mục theo thẻ: ${error.message}`);
    }
  }

  async findOne(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new Error('ID danh mục không hợp lệ');
      }
      const category = await this.categoryModel
        .findById(id)
        .populate('parent', 'name slug')
        .exec();

      if (!category) {
        throw new Error(`Danh mục với ID ${id} không tồn tại`);
      }

      return {
        success: true,
        data: category,
        message: 'Lấy thông tin danh mục thành công',
      };
    } catch (error) {
      throw new Error(`Không thể lấy thông tin danh mục: ${error.message}`);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new Error('ID danh mục không hợp lệ');
      }
      const existingCategory = await this.categoryModel.findById(id);
      if (!existingCategory) {
        throw new Error(`Danh mục với ID ${id} không tồn tại`);
      }

      const updatedCategory = await this.categoryModel
        .findByIdAndUpdate(id, updateCategoryDto, { new: true })
        .exec();

      return {
        success: true,
        data: updatedCategory,
        message: 'Cập nhật danh mục thành công',
      };
    } catch (error) {
      throw new Error(`Không thể cập nhật danh mục: ${error.message}`);
    }
  }

  async remove(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new Error('ID danh mục không hợp lệ');
      }

      // Check if category exists
      const category = await this.categoryModel.findById(id);
      if (!category) {
        throw new Error(`Danh mục với ID ${id} không tồn tại`);
      }
      await this.categoryModel.findByIdAndDelete(id);

      return {
        success: true,
        data: { id },
        message: 'Xóa danh mục thành công',
      };
    } catch (error) {
      throw new Error(`Không thể xóa danh mục: ${error.message}`);
    }
  }

  async getTopLevelCategories() {
    try {
      const categories = await this.categoryModel
        .find({ parent: null, isActive: true })
        .sort({ name: 1 })
        .exec();

      return {
        success: true,
        data: categories,
        message: 'Lấy danh mục gốc thành công',
      };
    } catch (error) {
      throw new Error(`Không thể lấy danh mục gốc: ${error.message}`);
    }
  }

}
