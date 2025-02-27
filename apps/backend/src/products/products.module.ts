import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ProductsGateway } from './product.gateway';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService, ProductsGateway],
  exports: [ProductsService],
})
export class ProductsModule {}
