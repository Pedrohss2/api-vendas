import { Router } from "express";

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello word!' })
});

export default routes;
