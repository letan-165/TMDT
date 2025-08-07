import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './schemas/category.schema';
import aqp from 'api-query-params';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const newCategory = new this.categoryModel(createCategoryDto);
      const savedCategory = await newCategory.save();
      return savedCategory;
    } catch (error) {
      throw new Error(`Không thể tạo danh mục: ${error.message}`);
    }
  }

  async findAll(query: string, current: number, pageSize: number) {
    const { filter, sort } = aqp(query);
    console.log('Filter:', filter);
    console.log('Sort:', sort);
    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;
    if (!current) current = 1;
    if (!pageSize) pageSize = 10;
    const totalItems = await this.categoryModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (current - 1) * pageSize;
    const categories = await this.categoryModel.find(filter).sort(sort as any).skip(skip).limit(pageSize).lean();
    return { categories, totalPages };
  }


  async findOne(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new Error('ID danh mục không hợp lệ');
      }
      const category = await this.categoryModel
        .findById(id)
        .lean();

      if (!category) {
        throw new Error(`Danh mục với ID ${id} không tồn tại`);
      }

      return category;
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
      const updatedCategory = await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true })
      return updatedCategory;
    } catch (error) {
      throw new Error(`Không thể cập nhật danh mục: ${error.message}`);
    }
  }

  async remove(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new Error('ID danh mục không hợp lệ');
      }

      const category = await this.categoryModel.findById(id);
      if (!category) {
        throw new Error(`Danh mục với ID ${id} không tồn tại`);
      }
      await this.categoryModel.findByIdAndDelete(id);

      return {
        _id: id,
        message: 'Xóa danh mục thành công',
      };
    } catch (error) {
      throw new Error(`Không thể xóa danh mục: ${error.message}`);
    }
  }

}
