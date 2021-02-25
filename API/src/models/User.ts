// User.ts servirá para a ligação/inserção dos dados na Table users do BD
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"
import { v4 as uuid } from 'uuid';


@Entity("users")//Determina que é um repositório da table users que criamos no migration
class User {

    @PrimaryColumn()
    readonly id: string;//para a responsabilidade de criar o id seja da classe

    @Column()
    name: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date

    // Para edição de usuário e não criação
    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }
}

export { User }