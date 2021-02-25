import { Request, Response } from 'express';
import { resolve } from 'path';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import SendMailService from '../services/SendMailService';

class SendMailController {
    async execute(request: Request, response: Response) {
        // Pegando os dados que foram colocadso no corpo da request(no isominia)
        const { email, survey_id } = request.body;

        // Acessando os repositórios que serão necessários
        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        // Verificando se usuário que enviou o email existe no BD
        const user = await usersRepository.findOne({email});
        // Se não existir
        if(!user){
            // Status Code e body em json da mensagem de erro
            return response.status(400).json({
                error: "User does not exists",
            });
        }

        // Verificando se a pesquisa/survey existe no BD
        const survey = await surveysRepository.findOne({id: survey_id});
        // Se não existir
        if(!survey){
            // Status Code e body em json da mensagem de erro
            return response.status(400).json({
                error: "Survey does not exist",
            });
        }

        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            user_id: user.id,
            link: process.env.URL_MAIL,
        }

        // caminho do estrutura e estilização do email
        const npsPath = resolve(__dirname,"..", "views", "emails", "npsMail.hbs");

        /* Verificando se usuario já deu sua nota/opinião no email */ 
        const surveyUserAlreadExists = await surveysUsersRepository.findOne({
            where: [{user_id: user.id}, {value: null}],
            relations: ["user", "survey"],
        });

        if(surveyUserAlreadExists){
            await SendMailService.execute(email, survey.title, variables, npsPath);
            return response.json(surveyUserAlreadExists);
        }

        /* Salvar as informações na tabela surveyUser */
        // anotando dados a serem salvos
        const surveyUser = surveysUsersRepository.create({
            user_id: user.id,
            survey_id,
        })
        // salvando na table do BD
        await surveysUsersRepository.save(surveyUser);


        /* Enviar e-mail para o usuário */
        // to: para quem, subject: assunto/titulo , body: corpo do email
        


        await SendMailService.execute(email, survey.title, variables, npsPath);


        return response.json(surveyUser);
    }
}

export { SendMailController }