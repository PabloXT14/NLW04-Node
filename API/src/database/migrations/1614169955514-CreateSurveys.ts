import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSurveys1614169955514 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Criando Table "surveys" no BD(sqlite)
        await queryRunner.createTable(
            new Table({
                name: "surveys",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "title",
                        type: "varchar"
                    },
                    {
                        name: "description",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"// horario atual do pc
                    }
                ]
            })
        );
    }

    // Para quando for necessário deletar a Table Surveys
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("surveys");
    }

}
