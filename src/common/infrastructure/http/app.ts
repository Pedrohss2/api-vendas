import express  from "express";
import cors from 'cors';
import { routes } from "./routes";

const app = express();

const PORT = 8080;

app.use(cors());
app.use(express.json());

app.use();

app.use(routes);

export { app };
