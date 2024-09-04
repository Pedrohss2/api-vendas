import productsRouter from "@modules/products/routes/products.routes";
import usersRouter from "@modules/users/routes/user.routes";
import sessionsRoutes from "@modules/users/routes/sessions.routes";
import forgotPassword  from "@modules/users/routes/password.routes";
import { Router } from "express";


const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/login', sessionsRoutes);
routes.use('/password', forgotPassword);

export default routes;
