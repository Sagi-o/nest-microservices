import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { rabbitMQQueue, rabbitMQUrl } from './rabbitmq.config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [rabbitMQUrl],
        queue: rabbitMQQueue,
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  app
    .listen()
    .then(() =>
      console.log(
        `Microservice is listening on ${rabbitMQUrl}, queue: ${rabbitMQQueue}`,
      ),
    );
}
bootstrap();
