import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';

@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) { }

  @Post()
  async create(@Body() createDiscountDto: CreateDiscountDto) {
    return await this.discountService.create(createDiscountDto);
  }

  @Get()
  async findAll(@Query('query') query: string, @Query('current') current: number, @Query('pageSize') pageSize: number) {
    return await this.discountService.findAll(query, current, pageSize);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.discountService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDiscountDto: UpdateDiscountDto) {
    return await this.discountService.update(id, updateDiscountDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.discountService.remove(id);
  }


}
