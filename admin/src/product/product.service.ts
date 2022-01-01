import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  getAllProducts(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  getProduct(id: string): Promise<ProductEntity> {
    return this.productRepository.findOne(id);
  }

  createProduct(createProductDto: CreateProductDto): Promise<ProductEntity> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  updateProduct(
    id: string,
    updateProductDto: Partial<UpdateProductDto>,
  ): Promise<UpdateResult> {
    return this.productRepository.update(id, updateProductDto);
  }

  deleteProduct(id: string): Promise<DeleteResult> {
    return this.productRepository.delete(id);
  }
}
