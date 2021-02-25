import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSurveysUsers1614253630836 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Craindo Table surveys_users no BD(sqlite)
        await queryRunner.createTable(
            new Table({
                name: "surveys_users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                    },
                    {
                        name: "survey_id",
                        type: "uuid",
                    },
                    {
                        name: "value",
                        type: "number",
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",// horario atual do pc
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKUser",
                        referencedTableName: "users",//tabela de referência
                        referencedColumnNames: ["id"],//coluna da table de referência
                        columnNames: ["user_id"],// coluna da tabel surveys_users que vai receber o valor de referêcia
                        onDelete: "CASCADE", // para a table surveys_users também receber as alterações que haja na table de referência
                        onUpdate: "CASCADE",// = onDelete
                    },
                    {
                        name: "FKSurvey",
                        referencedTableName: "surveys",
                        referencedColumnNames: ["id"],
                        columnNames: ["survey_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ],
            })
        );
    }

    // Para quando for necessário deletar a Table Surveys
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("surveys_users");
    }

}
