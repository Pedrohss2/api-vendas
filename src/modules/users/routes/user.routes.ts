import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import UsersController from "../controllers/UsersController";
import UserRepository from "../typeorm/repositories/UserRepository";
import isAuthenticated from "../middlewares/isAuthenticated";

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', isAuthenticated,  usersController.list);
usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create
);

export default usersRouter;
