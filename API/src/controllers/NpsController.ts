import { Request, Response } from 'express';
import { getCustomRepository, Not, IsNull } from 'typeorm';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class NpsController{
    /*
        NPS (Net Promoter Score - Pontuação Net Promoter):
        - O Net Promoter Score é uma metodologia de satisfação de clientes desenvolvida para avaliar o grau de fidelidade dos clientes de qualquer perfil de empresa.

        - Notas: 1 á 10
            * Detratores => 0 - 6  (usado no cálculo)
            * Passivos => 7 - 8    (descartado)
            * Promotores => 9 - 10 (usado no cálculo)
            * Respondentes => nº de pessoas respondel a pesquisa
            
            NPS = (Nº promotores - Nº detratores) / Nº respondentes x 100
    */


    async execute(request: Request, response: Response) {
        // Pegando id da survey/pesquisa
        const { survey_id } = request.params;
        
        // Acessando repositório que será necessário
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        // Buscando todos as respotas da pesquisa referente ao id da survey
        const surveysUsers = await surveysUsersRepository.find({
            survey_id,
            value: Not(IsNull()),//calcular na pesquisa apenas quem respondeu 
        })

        // Determinando nº de detratores
        const detractor = surveysUsers.filter(
            (survey) => survey.value >=0 && survey.value <= 6
        ).length;

        // Determinando nº  de promotores
        const promoters = surveysUsers.filter(
            (survey) => survey.value >=9 && survey.value <= 10
        ).length;

        // Determinando nº de passivos (só para curiosidade da empresa)
        const passive = surveysUsers.filter(
            (survey) => survey.value >=7 && survey.value <=8
        ).length;

        // Determinando respondentes
        const totalAnswers = surveysUsers.length;

        // Determinando o NPS
        const calculate = Number((( (promoters - detractor) / totalAnswers ) * 100).toFixed(2));

        // Enviando resposta da pesquisa
        return response.json({
            detractor,
            promoters,
            passive,
            totalAnswers,
            nps: calculate,
        });
    }
}

export{ NpsController }