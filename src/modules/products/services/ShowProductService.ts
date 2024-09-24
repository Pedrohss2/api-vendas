import AppError from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";
import { IProductRepository } from "../domain/repositories/IProductRepository";
import { IProduct } from "../domain/models/IProduct";
import { IShowProduct } from "../domain/models/IShowProduct";

@injectable()
class ShowProductService {

  constructor(
    @inject('ProductsRepository') private productsRepository: IProductRepository
  ) { };

  public async show( { id } : IShowProduct ): Promise<IProduct> {
  
    const product = await this.productsRepository.findOne(id);
  
    if (!product) throw new AppError("Product not found!", 404);

    return product;
  }
}

export default ShowProductService;
