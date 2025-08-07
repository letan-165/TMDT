import { Body, Controller, Param, Post, Get, Delete, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Public } from '@/auth/decorator/public';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }
  
  @Post()
  @Public()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.create(createCategoryDto);
  }
  
  @Post('update/:id')
  @Public()
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoriesService.update(id, updateCategoryDto);
  }

  @Get()
  @Public()
  async findAll(@Query() query: string, @Query('current') current: number, @Query('pageSize') pageSize: number) {
    return await this.categoriesService.findAll(query, current, pageSize);
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string) {
    return await this.categoriesService.findOne(id);
  }

  @Delete(':id')
  @Public()
  async remove(@Param('id') id: string) {
    return await this.categoriesService.remove(id);
  }

}
