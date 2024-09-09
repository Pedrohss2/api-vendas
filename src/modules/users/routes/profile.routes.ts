import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import ProfileController from "@modules/users/controllers/ProfileController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import { eachMinuteOfInterval } from "date-fns";

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuthenticated);

profileRouter.get(
  '/',
  profileController.show
);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      oldPassword: Joi.string(),
      password: Joi.string().optional(), 
      passwordConfirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.exist(),
          then: Joi.required(),
        }),
    }
  }),
  profileController.update
);

export default profileRouter;
