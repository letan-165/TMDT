import {Body, Controller, Get, Param, Post, Query, Req, Patch, Delete} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Public } from '@/auth/decorator/public';
import { CreateProductDto } from './dto/create-product.dto';
import { Role } from '@/auth/enum/role.enum';
import { Roles } from '@/auth/decorator/roles.decorator';

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
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Public()
  @Roles(Role.SELLER)
  @Get('seller')
  findOneBySeller(@Req() req) {
    const sellerId = req.user.id;
    return this.productsService.findOneBySeller(sellerId);
  }

  @Patch('admin/:id')
  update(@Param('id') id: string, @Body() updateProductDto: any) {
    return this.productsService.updateProductAdmin(id, updateProductDto);
  }

  @Patch('seller/:id')
  updateProduct(@Param('id') id: string, @Body() updateProductDto: any) {
    return this.productsService.updateProductSeller(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
