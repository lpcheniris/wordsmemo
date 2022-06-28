import express, { Application } from 'express';
import bodyParser from "body-parser";
import { routes } from "./routes";
import setupMongo from "./config/mongo";

setupMongo()
// Boot express
export const app: Application = express();
app.use(bodyParser.json())
// Application routing
routes(app);