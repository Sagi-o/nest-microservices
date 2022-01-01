import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductService } from './product.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { rabbitMQProductService } from 'src/rabbitmq.config';

@Controller('products')
export class ProductController {
  constructor(
    private productService: ProductService,
    @Inject(rabbitMQProductService) private client: ClientProxy,
  ) {}

  @Get()
  async getAllProducts() {
    const products = await this.productService.getAllProducts();
    this.client.emit('get_all_products', products);
    return products;
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    const product = await this.productService.getProduct(id);
    this.client.emit('get_product', product);
    return product;
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.createProduct(createProductDto);
    // Emit event to the subscribers of the 'main_queue'
    this.client.emit('create_product', product);
    return product;
  }

  // Called from the 'main' microservice
  @Post(':id/like')
  async likeProduct(@Param('id') id: string) {
    const product = await this.productService.getProduct(id);
    return this.productService.updateProduct(id, { likes: product.likes + 1 });
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    this.client.emit('delete_product', { id });
    return this.productService.deleteProduct(id);
  }
}
