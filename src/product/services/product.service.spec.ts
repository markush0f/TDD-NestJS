import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entities/product.entitie';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';


describe('ProductService', () => {
  let service: ProductService;
  let repository: Repository<Product>;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
          autoLoadEntities: true,
          synchronize: true,
        }),
      ]
    }).compile();

    repository = module.get('ProductRepository');
    service = module.get<ProductService>(ProductService);
  });

  afterEach(async () => {
    await repository.query('DELETE FROM product')
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('listProducts', () => {
    it('should return an array of products', async () => {
      const product1: Product = {
        id: 1,
        name: 'Munchitos',
        price: 2.00,
        quantity: 43
      }
      const product2: Product = {
        id: 2,
        name: 'Coca-cola',
        price: 1.40,
        quantity: 34
      }
      await repository.save([product1, product2])

      const allProducts = await service.listProducts()
      console.log(allProducts.products);

      expect(allProducts.products).toHaveLength(2)
      expect(allProducts.products[0]).toEqual(product1)
      expect(allProducts.products[1]).toEqual(product2)

    })
  })


});
