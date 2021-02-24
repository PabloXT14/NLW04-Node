import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/User";

@EntityRepository(User)// Especifica que essa classe será um repositório do BD(sqlite)
class UsersRepository extends Repository<User>{

}

export { UsersRepository };