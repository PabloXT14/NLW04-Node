import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';


class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        /* Verificação de Validação */
        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
        })
        // if( !(await schema.isValid(request.body)) ) {
        //     return response.status(400).json({
        //         error: "Validation Failed!"
        //     });
        // }
        // Outra forma de fazer (para saber mais sobre o erro que deu):
        try{
            await schema.validate(request.body, {abortEarly: false});
        }catch(err){
            // return response.status(400).json({
            //     error: err
            // });

            // Erro, outra maneira de apresentá-lo
            throw new AppError(err);
        }


        // Repository = serve para fazer qualquer ação no banco de dados, neste caso criar um usuário
        const usersRepository = getCustomRepository(UsersRepository);

        // ===== Verificando se usuário já existe =====
        // SELECT * FROM USERS WHERE EMAIL = "email"
        const userAlreadyExists = await usersRepository.findOne({
            email,
        });

        if(userAlreadyExists) {
            // return response.status(400).json({
            //     error: "User already exists!",
            // })
            // Erro, outra maneira de apresentá-lo
            throw new AppError("User already exists!");
        }

        const user = usersRepository.create({
            name, email
        });

        // Salvando usuário inserido no body(no insominia), dentro do BD
        await usersRepository.save(user);

        return response.status(201).json(user);
    }
}

export { UserController };
