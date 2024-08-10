import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";
import AppError from "@shared/errors/appError";

interface IRequest {
  id: string;
}

class RemoveProductService {
  
  public async delete( { id } : IRequest ): Promise<void> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError("Product not found!");
    }
  
    await productsRepository.remove(product);
  }
}

export default RemoveProductService;
