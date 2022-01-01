import { HttpService } from '@nestjs/axios';
import { Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
    private httpService: HttpService,
  ) {}

  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Post(':id/like')
  async likeProduct(@Param('id') id: string) {
    const product = await this.productService.getProduct(id);

    // Call to 'admin' microservice to update like on its database
    this.httpService
      .post(`http://localhost:3000/api/products/${id}/like`, {})
      .subscribe();

    return this.productService.updateProduct(id, { likes: product.likes + 1 });
  }

  // Events from 'admin' microservice
  @EventPattern('get_all_products')
  getAllProductsEvent(data: string) {
    console.log('[get_all_products]:', data);
  }

  @EventPattern('get_product')
  getProductEvent(id: string) {
    console.log('[get_product]:', id);
  }

  @EventPattern('create_product')
  async createProductEvent(createProductDto: CreateProductDto) {
    console.log('[create_product]:', createProductDto);
    await this.productService.createProduct(createProductDto);
  }

  @EventPattern('delete_product')
  async deleteEvent(id: string) {
    console.log('[delete_product]:', id);
    await this.productService.deleteProduct(id);
  }

  // @Get(':id')
  // getProduct(@Param('id') id: string) {
  //   return this.productService.getProduct(id);
  // }

  // @Post()
  // createProduct(@Body() createProductDto: CreateProductDto) {
  //   return this.productService.createProduct(createProductDto);
  // }

  // @Delete(':id')
  // deleteProduct(@Param('id') id: string) {
  //   return this.productService.deleteProduct(id);
  // }
}
