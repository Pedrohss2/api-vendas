import { Request, Response } from "express";
import ListProductService from "../../../services/ListProductService";
import ShowProductService from "../../../services/ShowProductService";
import CreateProductService from "../../../services/CreateProductService";
import UpdateProductService from "../../../services/UpdateProductService";
import DeleteProductService from "../../../services/DeleteProductService";
import { container } from "tsyringe";

export default class ProductsController {

  public async list(request: Request, response: Response): Promise<Response> {
    const listProducts = container.resolve(ListProductService);

    const products = await listProducts.list();

    return response.json(products);
  }

  public async show(request: Request, response: Response): Promise<Response>  {
    const { id } = request.params;
    
    const showProduct = container.resolve(ShowProductService);

    const product = await showProduct.show({ id });

    return response.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.create({ name, price, quantity });

    return response.status(201).json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const { id } = request.params;
    const updateProduct = container.resolve(UpdateProductService);

    const product = await updateProduct.update({ id, name, price, quantity });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = container.resolve(DeleteProductService);

    const product = await deleteProduct.delete({ id });

    return response.json(product);
  }
}
