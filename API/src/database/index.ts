import { Connection, createConnection, getConnectionOptions } from "typeorm";

// Verificando qual BD(banco de dados) usar, o BD para os testes ou BD oficial
export default async (): Promise<Connection> => {

    // criando copia do BD oficial
    const defaultOptions = await getConnectionOptions();
    return createConnection(
        // Escolhendo qual BD usar, o de test ou o oficial
        Object.assign(defaultOptions, {
            database: process.env.NODE_ENV === 'test' ? "./src/database/database.test.sqlite" : defaultOptions.database
        })
    );
}