import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  ValidationPipe
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsQueryDto } from './dto/get-products-query.dto';
import { StockUpdateDto } from './interfaces/product.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body(ValidationPipe) createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query(ValidationPipe) query: GetProductsQueryDto) {
    return this.productsService.findAll(query);
  }

  @Get('search')
  search(@Query('q') searchTerm: string, @Query('limit') limit: number = 10) {
    return this.productsService.searchProducts(searchTerm, limit);
  }

  @Get('featured')
  getFeaturedProducts(@Query('limit') limit: number = 10) {
    return this.productsService.getFeaturedProducts(limit);
  }

  @Get('low-stock')
  getLowStockProducts(@Query('threshold') threshold: number = 10) {
    return this.productsService.getLowStockProducts(threshold);
  }

  @Get('category/:categoryId')
  getProductsByCategory(
    @Param('categoryId') categoryId: string,
    @Query('limit') limit?: number
  ) {
    return this.productsService.getProductsByCategory(categoryId, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Get(':id/related')
  getRelatedProducts(
    @Param('id') id: string,
    @Query('limit') limit: number = 5
  ) {
    return this.productsService.getRelatedProducts(id, limit);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateProductDto: UpdateProductDto
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Patch(':id/stock')
  updateStock(
    @Param('id') id: string,
    @Body(ValidationPipe) stockUpdateDto: StockUpdateDto
  ) {
    return this.productsService.updateStockAdvanced(id, stockUpdateDto);
  }

  @Patch(':id/toggle-status')
  toggleProductStatus(@Param('id') id: string) {
    return this.productsService.toggleProductStatus(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
