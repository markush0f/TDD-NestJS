import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controller/product.controller';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule { }
