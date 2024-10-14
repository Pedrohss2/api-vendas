import express  from "express";
import cors from 'cors';
import { routes } from "./routes";
import { erroHandler } from "@/common/domain/errors/middlewares/errorHandler";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API doc',
      version: '1.0.0'
    },
  },
  apis: ['./src/**/*.ts']
}

const swaggerSpec = swaggerJSDoc(options);

const app = express();

app.use(cors());
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(routes);
app.use(erroHandler);


export { app };
