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

  public async create({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const productExist = await productsRepository.findByName(name);
    
    if (productExist) {
      throw new AppError("Product exist!");
    } 
    
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
