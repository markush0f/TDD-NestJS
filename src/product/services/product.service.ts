import { Injectable } from '@nestjs/common';
import { ProductType } from '../types/product.type';
import { CreateProductDto } from '../dto/createProduct.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entitie';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';



@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectMapper() private readonly mapper: Mapper
    ) { }
    public index(): string {
        return 'Welcome to shop!';
    }

    public async listProducts(): Promise<any> {
        try {
            const products = await this.productRepository.find()
            if (products) {
                return {
                    'success': true,
                    'products': products,
                    'status': 200
                }
            }

        } catch (e) {
            return {
                'success': false,
                'error': e
            }
        }
        return {
            'success': false
        }
        // return this.productRepository.find()
    }

    public async findProductById(id: number): Promise<any> {
        const product = this.productRepository.findOneBy({ id })
        if (product) {
            return {
                'product': product,
                'success': true
            }
        }
        return {
            'success': false
        }
    }

    public async createProduct(createProductDto: CreateProductDto): Promise<any> {
        try {
            const product = new Product()
            const productMap = this.mapper.map(createProductDto, CreateProductDto, Product)

            // const newProduct = this.productRepository.create()
            console.log(productMap);

            if (product) {
                return {
                    'product': product,
                    'success': true
                }
            }
        } catch (e) {
            return {
                'error': e,
                'success': false
            }
        }
        return {
            'success': false,
            'message': 'Fail to create the product'
        }
    }

    public async removeProduct(id: number): Promise<any> {
        const productToRemove = await this.findProductById(id)
        this.productRepository.remove(productToRemove);
        const allProducts = await this.listProducts()
        if (allProducts.includes(productToRemove) || !productToRemove) {
            return {
                'success': false,
                'message': `Product with id:${id} not removed`
            }
        }
        return {
            'product': productToRemove,
            'success': true,
            'message': `Product with id:${id} removed`
        }

    }

    public async updateProduct(id: number, product: Partial<CreateProductDto>): Promise<CreateProductDto> {
        // const productToUpdate = await this.findProductById(id)
        const productToUpdate = await this.productRepository
            .update({ price: product.price, quantity: product.quantity }, { id: id })
        const listProducts = await this.listProducts()
        return
    }

    public async updateSeveralProducts(products: CreateProductDto[]) {

    }
}
