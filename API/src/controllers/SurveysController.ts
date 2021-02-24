import { Request, Response } from 'express';
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";

class SurveysController {
    async create(request: Request, response: Response) {
        // Pegando os dados da pesquisa do colocado no corpo da request
        const { title, description } = request.body;

        // Acessando Repositorio 
        const surveysRepository = getCustomRepository(SurveysRepository);

        // Anotando qual foi a pesquisa 
        const survey = surveysRepository.create({
            title,
            description
        });

        // Salvando pesquisa inserida no body(no insominia), dentro do BD
        await surveysRepository.save(survey);

        return response.status(201).json(survey);

    }

    // Mostrar todas pesquisas realizada/anotadas no BD(sqlite)
    async show(request: Request, response: Response) {
        const surveysRepository = getCustomRepository(SurveysRepository);

        // Anotando todas as pesquisas em uma variável
        const all = await surveysRepository.find();

        return response.json(all);
    }
}

export { SurveysController }