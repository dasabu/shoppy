import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductRequest } from './dto/create-product.request';
import { PrismaService } from '../prisma/prisma.service';
import { promises as fs } from 'fs';
import { join } from 'path';
import { PRODUCT_IMAGES } from './products.constants';
import { Prisma } from '@prisma/client';
import { ProductsGateway } from './product.gateway';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly productsGateway: ProductsGateway,
  ) {}

  async createProduct(data: CreateProductRequest, userId: number) {
    const product = this.prismaService.product.create({
      data: {
        ...data,
        userId,
      },
    });

    this.productsGateway.handleProductUpdated();
    return product;
  }

  async getProducts(status?: string) {
    const args: Prisma.ProductFindManyArgs = {};
    if (status === 'available') {
      args.where = { sold: false };
    }
    const products = await this.prismaService.product.findMany(args);
    return Promise.all(
      products.map(async (product) => ({
        ...product,
        imageExists: await this.imageExists(product.id),
      })),
    );
  }

  async getProduct(productId: number) {
    try {
      return {
        ...(await this.prismaService.product.findUniqueOrThrow({
          where: {
            id: productId,
          },
        })),
        imageExists: await this.imageExists(productId),
      };
    } catch (error) {
      throw new NotFoundException(`Product not found with ID ${productId}`);
    }
  }

  private async imageExists(productId: number) {
    try {
      await fs.access(`${PRODUCT_IMAGES}/${productId}.jpeg`, fs.constants.F_OK);
      return true;
    } catch (error) {
      return false;
    }
  }

  async update(productId: number, data: Prisma.ProductUpdateInput) {
    await this.prismaService.product.update({
      where: { id: productId },
      data,
    });
    this.productsGateway.handleProductUpdated();
  }
}
