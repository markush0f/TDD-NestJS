import { Injectable } from '@nestjs/common';
import { ProductController } from '../controller/product.controller';
import { ProductType } from '../types/product.type';
@Injectable()
export class ProductService {


    public index(): string {
        return 'Welcome to shop!';
    }

    public listProducts(): ProductType[] {
        return [];
    }

    public findProductById(id: number): ProductType {
        return
    }

    public createProduct(product: ProductType): ProductType {
        return product
    }

    public removeProduct(id: number): ProductType {
        return
    }

    public updateProduct(id: number, product: Partial<ProductType>): ProductType {
        return
    }
}
