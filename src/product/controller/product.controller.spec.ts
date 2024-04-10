import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from '../services/product.service';
import { ProductType } from '../types/product.type';
import { CreateProductDto } from '../dto/createProduct.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entities/product.entitie';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

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

      imports: [
        TypeOrmModule.forFeature([Product]),
        AutomapperModule.forRoot({
          strategyInitializer: classes()
        }),
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '1234',
          database: 'products',
          entities: [Product],
          synchronize: true,
        }),

      ]
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
      const listProducts: CreateProductDto[] = products
      const listProductsPromise = Promise.resolve(listProducts);
      jest.spyOn(productService, 'listProducts').mockReturnValue(listProductsPromise);
      expect(productController.listProducts()).toEqual(listProductsPromise);
    });
  });



  describe('findProductById', () => {
    it("should return a product by id", async () => {
      const productSearched: CreateProductDto = products[0];
      const productSearchedPromise = Promise.resolve(productSearched);
      console.log((await productSearchedPromise));
      // Spy the controller methods
      jest.spyOn(productService, 'findProductById').mockReturnValue(productSearchedPromise);
      const result = await productController.findProductById(productSearched.id);
      expect(result).toBe(productSearched);
      expect(productService.findProductById).toHaveBeenCalledWith(productSearched.id);
      expect(result).toEqual(productSearched);
    });
  });


  describe('createProduct', () => {
    it('should create a product and return it', async () => {
      const createProductDto: CreateProductDto = products[1];
      const productCreated: CreateProductDto = products[1];

      jest.spyOn(productService, 'createProduct').mockResolvedValue(productCreated);
      jest.spyOn(productController, 'createProduct')
      const result = await productController.createProduct(createProductDto);

      expect(productService.createProduct).toHaveBeenCalledWith(createProductDto);
      expect(productController.createProduct).toHaveBeenCalledWith(createProductDto);
      expect(result).toEqual(productCreated);
    });
  });


  describe('removeProduct', () => {
    it("should remove a product by id and return a product", async () => {
      const id = 3;
      const productToRemove = products[2]
      const productRemovedPromise = Promise.resolve(productToRemove)
      jest.spyOn(productService, 'removeProduct').mockReturnValue(productRemovedPromise)

      const result = await productController.removeProduct(id)
      expect(productService.removeProduct).toHaveBeenCalledWith(id)
      expect(productService.removeProduct).toHaveBeenCalledTimes(1)
      console.log(result);
      expect(result).toEqual(products[2])
    })
  })


});
