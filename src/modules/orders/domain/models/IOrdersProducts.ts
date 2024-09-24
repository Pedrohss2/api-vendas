import Order from "@modules/orders/infra/typeorm/entities/Orders";
import Product from "@modules/products/infra/typeorm/entities/Product";

export interface IOrdersProducts {
  id: string;

  order: Order;

  product: Product;

  orderId: string;

  productId: string;

  price: number;
  
  quantity: number;
    
  created_at: Date;

  updated_at: Date;
}
