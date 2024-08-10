import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";
import AppError from "@shared/errors/appError";

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  
  public async update( { id, name, price, quantity } : IRequest ): Promise<Product | undefined> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const productExist = await productsRepository.findByName(name);
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError("Product not found!");
    }
    if (productExist && name != product.name) {
      throw new AppError("Product exist!");
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;
  
    await productsRepository.save(product);
    
    return product;
  }
}

export default UpdateProductService;
