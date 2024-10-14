import { Router } from "express";

const routes = Router();

routes.get('/', (request, response) => {
  return response.status(200).json({message: "Hello world"});
});

export { routes };
