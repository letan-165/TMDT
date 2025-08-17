import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Store, StoreDocument } from './schemas/store.schema';
import { Model } from 'mongoose';
import aqp from 'api-query-params';
import { UsersService } from '@/users/users.service';

@Injectable()
export class StoreService {
  constructor(@InjectModel(Store.name) private storeModel: Model<StoreDocument>,
    private usersService: UsersService) { }

  async create(createStoreDto: CreateStoreDto) {
    try {
      await this.usersService.registerAsSeller(createStoreDto.userId);
      const createdStore = new this.storeModel(createStoreDto);
      const savedStore = await createdStore.save();
      await savedStore.populate('userId', 'name email');
      return savedStore;
    } catch (error) {
      throw new Error(`Không thể tạo cửa hàng: ${error.message}`);
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
    const totalItems = await this.storeModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (current - 1) * pageSize;
    const stores = await this.storeModel.find(filter)
      .sort(sort as any)
      .skip(skip)
      .limit(pageSize)
      .populate('userId', 'name email')
      .lean();
    return { stores, totalPages };
  }

  async findOne(id: string) {
    return this.storeModel.findById(id).populate('userId', 'name email').lean();
  }

  async update(id: string, updateStoreDto: UpdateStoreDto) {
    return this.storeModel.findByIdAndUpdate(id, updateStoreDto, { new: true }).populate('userId', 'name email').lean();
  }

  async remove(id: string) {
    const store = await this.storeModel.findById(id);
    if (!store) {
      throw new Error(`Không tìm thấy cửa hàng với ID ${id}`);
    }
    await this.storeModel.deleteOne({ _id: id });
    return { message: 'Xóa cửa hàng thành công' };
  }

}
