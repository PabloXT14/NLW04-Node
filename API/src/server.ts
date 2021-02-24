//import 'reflect-metadata';
// Express: MicroFramework que ajuda a criar um servidor (obs: precisa instalar as suas dependências com o yarn/npm)
// import express from 'express';
// import "./database";//importa o index por padrão
// import { router } from './routes';

import { app } from "./app";

// const app = express();


/* =========== ESTUDOS INICIAIS DE TESTE =========== */
/*
    Métodos HTTP (principais):
    - GET => Buscar (dados no servidor)
    - POST => Salvar (dados no servidor)
    - PUT => Alterar (dados do servidor, 1 ou + por ver)
    - DELETE => Deletar (dados do servidor)
    - PATCH => Alteração específica (1 dado específico por vez no servidor )
*/


/* ==== Criando Servidor ==== */
// app.listen(3333, () => console.log("Servir is running!"));


// /* ==== Usando os Methods ==== */

// // http://localhost:3333/users

// // 1º param => Rota(Recurso API)
// // 2º param => request, response

// app.get("/", (request, response) => {
//     // return response.send("Hello World - NLW04");
//     return response.json({message: "Hello World - NLW04"})
// });

// app.post("/", (resquest, response) => {
//     //Recebeu os dados para salvar
//     return response.json({message: "Os dados foram salvos com sucesso!"});
// });

// Para poder receber body em formato JSON
// app.use(express.json());
// Chamando router(rotas) de routes.ts
// app.use(router);

/* ==== Criando Servidor ==== */
app.listen(3333, () => console.log("Servir is running!"));