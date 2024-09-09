import productsRouter from "@modules/products/routes/products.routes";
import usersRouter from "@modules/users/routes/user.routes";
import sessionsRouter from "@modules/users/routes/sessions.routes";
import forgotPassword from "@modules/users/routes/password.routes";
import profileRouter  from "@modules/users/routes/profile.routes";
import { Router } from "express";


const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/login', sessionsRouter);
routes.use('/password', forgotPassword);
routes.use('/profile', profileRouter);

export default routes;
