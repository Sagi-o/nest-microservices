import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product, ProductDocument } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  getAllProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  getProduct(id: string): Promise<Product> {
    return this.productModel.findOne({ id }).exec();
  }

  createProduct(createProductDto: CreateProductDto): Promise<Product> {
    return new this.productModel(createProductDto).save();
  }

  updateProduct(
    id: string,
    updateProductDto: Partial<UpdateProductDto>,
  ): Promise<Product> {
    return this.productModel.findOneAndUpdate({ id }, updateProductDto).exec();
  }

  deleteProduct(id: string): Promise<any> {
    return this.productModel.deleteOne({ id }).exec();
  }
}
