import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  rabbitMQProductService,
  rabbitMQQueue,
  rabbitMQUrl,
} from 'src/rabbitmq.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    ClientsModule.register([
      {
        name: rabbitMQProductService,
        transport: Transport.RMQ,
        options: {
          urls: [rabbitMQUrl],
          queue: rabbitMQQueue,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
