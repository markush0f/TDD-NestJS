import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controller/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductProfile } from './services/productProfile.profile';
import { Product } from './entities/product.entitie';
@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
  ],
  imports: [TypeOrmModule.forFeature([Product])]
})
export class ProductModule { }
