import { Controller } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ProductType } from '../types/product.type';
@Controller('product')
export class ProductController {

  constructor(private readonly productService: ProductService) { }

  products: ProductType[] = []

  public index() {
    return this.productService.index();
  }

  public listProducts() {
    return this.productService.listProducts()
  }

  public findProductById(id: number) {
    return this.productService.findProductById(id)
  }

  public createProduct(product: ProductType) {
    return this.productService.createProduct(product);
  }

  public removeProduct(id: number) {
    return this.productService.removeProduct(id)
  }

  public updateProduct(id: number, product: ProductType) {
    return this.productService.updateProduct(id, product)
  }


}
