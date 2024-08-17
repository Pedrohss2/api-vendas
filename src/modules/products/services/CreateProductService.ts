import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/appError";
import Product from "../typeorm/entities/Product";
import { promises } from "dns";

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {

  public async create({ name, price, quantity }: IRequest): Promise<Product | AppError> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const productExist = await productsRepository.findByName(name);
    
    if (productExist) throw new AppError("There is already one product with this name!", 404);
    const product = productsRepository.create({
      name, 
      price,
      quantity,
    });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
