// Survey.ts servirá para a ligação/inserção dos dados na Table surveys do BD

import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity("surveys")// Determina que essa classe é um repositorio da table surveys, que criamos no migration
class Survey{
    @PrimaryColumn()
    readonly id: string;//para a responsabilidade de criar o id seja da classe


    @Column()
    title: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    // Para edição de usuário e não criação
    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }

}

export { Survey };