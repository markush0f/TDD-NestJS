import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ProductType } from '../types/product.type';
import { CreateProductDto } from '../dto/createProduct.dto';

@Controller('product')
export class ProductController {

  constructor(private readonly productService: ProductService) { }

  products: ProductType[] = []

  @Get('')
  public index() {
    return this.productService.index();
  }

  public listProducts() {
    return this.productService.listProducts()
  }

  public findProductById(id: number) {
    return this.productService.findProductById(id)
  }

  @Post()
  public createProduct(@Body() createProductDto: CreateProductDto) {
    console.log(createProductDto);
    return this.productService.createProduct(createProductDto);
  }

  public removeProduct(id: number) {
    return this.productService.removeProduct(id)
  }

  public updateProduct(id: number, product: CreateProductDto) {
    return this.productService.updateProduct(id, product)
  }


}
