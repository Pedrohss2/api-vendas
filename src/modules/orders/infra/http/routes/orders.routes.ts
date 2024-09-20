import { Router } from "express";
import OrderController from "../controllers/OrdersController";
import { celebrate, Joi, Segments} from 'celebrate'
import isAuthenticated from "@shared/infra/http/middlewares/isAuthenticated";
import Product from "@modules/products/infra/typeorm/entities/Product";
const ordersRouter = Router();
const orderController = new OrderController(); 

ordersRouter.use(isAuthenticated)

ordersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  orderController.show,
);

ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customerId: Joi.string().uuid().required(),
      products: Joi.required()
    }
  }),
  orderController.create
);


export default ordersRouter;
