import { Injectable } from '@nestjs/common';
import { ProductController } from '../controller/product.controller';
import { ProductType } from '../types/product.type';
import { CreateProductDto } from '../dto/createProduct.dto';

@Injectable()
export class ProductService {


    public index(): string {
        return 'Welcome to shop!';
    }

    public listProducts(): CreateProductDto[] {
        return ;
    }

    public findProductById(id: number): ProductType {
        return
    }

    public createProduct(product: CreateProductDto): CreateProductDto {
        console.log(product);
        
        return product
    }

    public removeProduct(id: number): CreateProductDto {
        return
    }

    public updateProduct(id: number, product: Partial<CreateProductDto>): CreateProductDto {
        return
    }
}
