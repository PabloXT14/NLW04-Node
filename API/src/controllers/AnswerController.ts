import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class AnswerController {
    // http://localhost:3333/answers/1?u=s23232d2323bvjsbv-svsv-svsvs-svsv3
    /*
        # Route Params => Parametros que compõem a rota
        ex:
        routes.get(* /answers/:value*)

        # Query Params => Servem para busca, paginação, e não são obrigatórios
        - vem depois do símbolo ?
        - estrutura:
            - chave=valor

    */
    async execute(request: Request, response: Response){
        // Busca parametros dentro da rota
        const { value } = request.params;
        const { u } = request.query;

        // Acessando repositório que será necessário
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        // Verificando se o id do surveyUser existe na table survey_user
        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u),
        });

        // Senão existir
        if(!surveyUser) {
            
            // retorna uma mensagem de erro
            // return response.status(400).json({
            //     error: "Survey User does not exists!",
            // });
            // Erro, outra maneira de apresentá-lo
            throw new AppError("Survey User does not exists!");
        }

        // Se existir continua rodando para salvar o valor dado na pesquisa
        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);
    }

}

export { AnswerController }