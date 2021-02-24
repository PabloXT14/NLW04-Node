import 'reflect-metadata';
// Express: MicroFramework que ajuda a criar um servidor (obs: precisa instalar as suas dependências com o yarn/npm)
import express from 'express';
import createConnection from "./database";//importa o index por padrão
import { router } from './routes';

createConnection();
const app = express();

app.use(express.json());
// Chamando router(rotas) de routes.ts
app.use(router);

export { app }