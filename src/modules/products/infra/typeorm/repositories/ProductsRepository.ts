import { getRepository, In, Repository } from "typeorm";
import Product from "../entities/Product";
import { IProductRepository } from "@modules/products/domain/repositories/IProductRepository";
import { IProduct } from "@modules/products/domain/models/IProduct";
import { ICreateProduct } from "@modules/products/domain/models/ICreateProduct";
import { IUpdateStockProduct } from "@modules/products/domain/models/IUpdateStockProduct";


interface IFindProducts {
  id: string;
}

export class ProductsRepository implements IProductRepository {
  private ormRepository: Repository<Product>;
  createQueryBuilder: any;

  constructor() {
    this.ormRepository = getRepository(Product);
  }
  
  public async create({name, price, quantity }: ICreateProduct): Promise<IProduct> {
    const product = await this.ormRepository.create({ name, price, quantity  });
    
    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: IProduct): Promise<IProduct> {
    await this.ormRepository.save(product);
    
    return product;
  }
  
  public async updateStock(products: IUpdateStockProduct[]): Promise<IUpdateStockProduct[]> {
    await this.ormRepository.save(products);
    
    return products;
  }

  public async findByName(name: string): Promise<IProduct | undefined> {
    const product = await this.ormRepository.findOne({
      where: {
        name,
      }
    });
    
    return product;
  }


  public async findAllById(products: IFindProducts[]): Promise<IProduct[]> {
    const productIds = products.map(product => product.id);
    
    const productExists = await this.ormRepository.find({ 
      where: {
        id: In(productIds), 
      }
    });

    return productExists;
  }

  public async findOne(id: string): Promise<IProduct | undefined> {
    const product = await this.ormRepository.findOne({
      where: {
        id,
      }
    });
    
    return product;
  }

   public async remove({ id }: IProduct): Promise<void> {
    const productDeleted = await this.ormRepository.delete(id);
  }
}
 