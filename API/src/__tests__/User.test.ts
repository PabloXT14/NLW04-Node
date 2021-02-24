import request from 'supertest';
import { app } from '../app';

import createConnection from '../database'

describe("Users", () => {

    // Rodando as migrations antes de tudo
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it("Should be able to create a new user", async () => {
        const response = await request(app).post("/users")
    .send({
        email: "user@example.com",
        name: "User Example"
        });

        expect(response.status).toBe(201);
    })

    // Teste para ver se o usuário já existe
    it("Should not be able to create a user with exists email", async () => {
        const response = await request(app).post("/users").send({
            email: "user@example.com",
            name: "User Example",
        });

        expect(response.status).toBe(400);

    });
});