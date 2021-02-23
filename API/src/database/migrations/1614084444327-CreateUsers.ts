import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1614084444327 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //Craindo Table Users do BD
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "email",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",// horario atual do pc
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    // Quando for preciso deletar a Table "users", ou qlq outra
        await queryRunner.dropTable("users");
    }

}
