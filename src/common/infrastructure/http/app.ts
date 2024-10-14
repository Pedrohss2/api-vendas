import express  from "express";
import cors from 'cors';
import { routes } from "./routes";
import { erroHandler } from "@/common/domain/errors/middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use(erroHandler);


export { app };
