import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";

interface IPaginateProduct {
  from: number,
  to: number,
  per_page: number,
  total: number,
  current_page: number,
  prev_page: number | null,
  next_page: number | null,
  data: Product[],
}

class ListProductService {
  
  public async list(): Promise<IPaginateProduct> {
    const productsRepository = getCustomRepository(ProductsRepository);
  
    const products = await productsRepository.createQueryBuilder().paginate();
  
    return products as IPaginateProduct;
  }
}

export default ListProductService;
