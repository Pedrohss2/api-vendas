import productsRouter from "@modules/products/infra/http/routes/products.routes";
import usersRouter from "@modules/users/infra/http/routes/user.routes";
import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes";
import forgotPassword from "@modules/users/infra/http/routes/password.routes";
import profileRouter from "@modules/users/infra/http/routes/profile.routes"; 
import ordersRouter from "@modules/orders/infra/http/routes/orders.routes";
import { Router } from "express";
import customersRouter from "@modules/customers/infra/http/routes/customer.routes";


const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/login', sessionsRouter);
routes.use('/password', forgotPassword);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);

export default routes;
