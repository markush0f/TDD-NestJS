import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from '../services/product.service';
import { ProductType } from '../types/product.type';
import { CreateProductDto } from '../dto/createProduct.dto';

describe('ProductController', () => {
  const products: CreateProductDto[] = [
    {
      id: 1,
      name: "Coca-Cola",
      price: 2
    } as CreateProductDto,
    {
      id: 2,
      name: "Lays",
      price: 5
    } as CreateProductDto,
    {
      id: 3,
      name: "Ketchup",
      price: 4
    } as CreateProductDto,
  ]

  let productController: ProductController;
  let productService: ProductService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    productController = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService)
  });

  it('should be defined', () => {
    expect(productController).toBeDefined();
  });


  describe('index', () => {
    it("should return 'Welcome to shop!'", () => {
      // En mockReturnValue mockeamos la respuesta del método index.
      jest.spyOn(productService, 'index').mockReturnValue('Welcome to shop!');
      expect(productController.index()).toBe('Welcome to shop!')
    })
  })


  describe('listProducts', () => {
    it("should return a list of products", () => {
      const productsMocked: CreateProductDto[] = products
      jest.spyOn(productService, 'listProducts').mockReturnValue(productsMocked);
      expect(productController.listProducts()).toEqual(productsMocked);
    })
  })

  describe('findProductById', () => {
    it("should return a product by id", () => {
      const productMocked: CreateProductDto = products[0]

      jest.spyOn(productService, 'findProductById').mockReturnValue(productMocked)
      const result = productController.findProductById(productMocked.id)
      expect(result).toBe(productMocked)
      expect(productService.findProductById).toHaveBeenCalledWith(productMocked.id)
      expect(productController.findProductById(productMocked.id)).toEqual(productMocked)

    })
  })

  describe('createProduct', () => {
    it("should create a product and return a product", () => {
      const productCreated: CreateProductDto = {
        id: 5,
        name: "Fanta",
        price: 2.4,
        quantity: 12
      }

      jest.spyOn(productService, 'createProduct').mockReturnValue(productCreated);
      const result = productController.createProduct(productCreated)
      expect(productService.createProduct).toHaveBeenCalledWith(productCreated)
      expect(productService.createProduct).toHaveBeenCalledTimes(1)
      expect(result).toEqual(productCreated)

    })
  })

  describe('removeProduct', () => {
    it("should remove a product by id and return a product", () => {
      const id = 3;

      jest.spyOn(productService, 'removeProduct').mockReturnValue(products[2])

      const result = productService.removeProduct(id)
      expect(productService.removeProduct).toHaveBeenCalledWith(id)
      expect(productService.removeProduct).toHaveBeenCalledTimes(1)
      expect(result).toEqual(products[2])
    })
  })

  describe('updateProduct', () => {
    it("should update a product by id and return a product", () => {
      // Data for update the product
      const updatedProduct: Partial<ProductType> = {
        name: 'RedBull',
        price: 2.3
      }
      // Product to update
      const productToUpdate = products[2];

      jest.spyOn(productService, 'updateProduct')
        // Controlamos el comportamiento de la función
        .mockImplementation((id: number, newProduct: Partial<ProductType>) => {
          return {
            ...productToUpdate,
            ...newProduct
          }
        })

      const result = productService.updateProduct(productToUpdate.id, updatedProduct)

      expect(productService.updateProduct).toHaveBeenCalledWith(productToUpdate.id, updatedProduct)
      expect(result.name).toBe(updatedProduct.name)
      expect(result.price).toBe(updatedProduct.price)

      jest.spyOn(productService, 'listProducts').mockReturnValue(products.filter(product => product.name !== productToUpdate.name));
      // Check if the product dont exist in the list
      expect(productController.listProducts()).not.toContain(productToUpdate)

    })
  })

});
