import 'reflect-metadata';
// Express: MicroFramework que ajuda a criar um servidor (obs: precisa instalar as suas dependências com o yarn/npm)
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import createConnection from "./database";//importa o index por padrão
import { router } from './routes';
import { AppError } from './errors/AppError';

createConnection();
const app = express();

app.use(express.json());
// Chamando router(rotas) de routes.ts
app.use(router);

// Chamando os erros que aparecerem
app.use(
    (err: Error, request: Request, response: Response, _next: NextFunction ) => {
        // Retorno para erros na applicação
        if(err instanceof AppError) {
            return response.status(err.statusCode).json({
                message: err.message,
            });
        }
        // Retorno para erro interno do servidor
        return response.status(500).json({
            status: "Error",
            message: `Internal server error ${err.message}`,
        });
    }
);

export { app }