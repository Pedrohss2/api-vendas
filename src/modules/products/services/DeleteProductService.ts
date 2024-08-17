import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/appError";

interface IRequest {
  id: string;
}

class DeleteProductService {
  
  public async delete( { id } : IRequest ): Promise<void> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const product = await productsRepository.findOne(id);

    if (!product) throw new AppError("Product not found!", 404);
  
    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
