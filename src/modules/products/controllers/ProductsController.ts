import { Request, Response } from "express";
import ListProductService from "../services/ListProductService";
import ShowProductService from "../services/ShowProductService";
import CreateProductService from "../services/CreateProductService";
import { Http2ServerResponse } from "http2";
import UpdateProductService from "../services/UpdateProductService";
import DeleteProductService from "../services/DeleteProductService";

export default class ProductsController {

  public async list(request: Request, response: Response): Promise<Response> {
    const listProducts = new ListProductService();

    const products = await listProducts.list();

    return response.json(products);
  }

  public async show(request: Request, response: Response): Promise<Response>  {
    const { id } = request.params;
    
    const showProduct = new ShowProductService();

    const product = await showProduct.show({ id });

    return response.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const createProduct = new CreateProductService();

    const product = await createProduct.create({ name, price, quantity });

    return response.status(201).json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const { id } = request.params;
    const updateProduct = new UpdateProductService();

    const product = await updateProduct.update({ id, name, price, quantity });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = new DeleteProductService();

    const product = await deleteProduct.delete({ id });

    return response.json(product);
  }
}
