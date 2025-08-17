import {Body, Controller, Get, Param, Post, Query, Req, Patch, Delete} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Public } from '@/auth/decorator/public';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @Public()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @Public()
  findAll(@Query() query: string, @Query('current') current: number, @Query('pageSize') pageSize: number) {
    return this.productsService.findAll(query, current, pageSize);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Public()
  @Get('seller/:id')
  findOneBySeller(@Param('id') id: string) {
    return this.productsService.findOneBySeller(id);
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Patch('status/:id')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    const statusBoolean = status === "true";
    return this.productsService.updateStatus(id, statusBoolean);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
