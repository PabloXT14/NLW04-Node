import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body;
        
        // Repository = serve para fazer qualquer ação no banco de dados, neste caso criar um usuário
        const usersRepository = getRepository(User);

        // ===== Verificando se usuário já existe =====
        // SELECT * FROM USERS WHERE EMAIL = "email"
        const userAlreadyExists = await usersRepository.findOne({
            email,
        });

        if(userAlreadyExists) {
            return response.status(400).json({
                error: "User already exists!",
            })
        }

        const user = usersRepository.create({
            name, email
        });

        // Salvando usuário inserido no body(no insominia), dentro do BD
        await usersRepository.save(user);

        return response.json(user);
    }
}

export { UserController };