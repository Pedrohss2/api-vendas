import { Router } from "express";
import SessionsController from "@modules/users/controllers/SessionsController";
import { celebrate, Joi, Segments } from "celebrate";


const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }
  }),
  sessionsController.login
);

export default sessionsRouter;
