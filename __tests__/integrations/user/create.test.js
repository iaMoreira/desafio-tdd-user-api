const request = require('supertest')
const truncate = require('../../utils/truncate')
const { userFactory } = require('../../../src/db/factories')
const app = require('../../../src/app')

describe('Create User', () => {
    beforeEach(() => {
        truncate()
    })

    it('deveria retornar um erro quando tentarmos criar um usuário e não passarmos o campo "name".', async () => {
        const userFaker = userFactory()
        const response = await request(app)
            .post('/users')
            .send({ password: userFaker.password, email: userFaker.email })

        expect(response.status).toBe(400)
        expect(response.body).not.toBeNull()
        expect(response.body.error).toBeDefined()
        expect(response.body.error.message).toBeDefined()
        expect(response.body.error.message).toBe('O campo "name" é obrigatório!')
    });

    it('deveria retornar um erro quando tentarmos criar um usuário e não passarmos o campo "email".', async () => {
        const userFaker = userFactory()
        const response = await request(app)
            .post('/users')
            .send({ name: userFaker.name, password: userFaker.password})

        expect(response.status).toBe(400)
        expect(response.body).not.toBeNull()
        expect(response.body.error).toBeDefined()
        expect(response.body.error.message).toBeDefined()
        expect(response.body.error.message).toBe('O campo "email" é obrigatório!')
    });

    it('deveria retornar um erro quando tentarmos criar um usuário e não passarmos o campo "password".', async () => {
        const userFaker = userFactory()
        const response = await request(app)
            .post('/users')
            .send({ name: userFaker.name, email: userFaker.email })

        expect(response.status).toBe(400)
        expect(response.body).not.toBeNull()
        expect(response.body.error).toBeDefined()
        expect(response.body.error.message).toBeDefined()
        expect(response.body.error.message).toBe('O campo "password" é obrigatório!')
    });

    it('deveria cadastrar um user quando executarmos um POST em /users com os dados válidos.', async () => {
        const userFaker = userFactory();

        const response = await request(app)
            .post('/users')
            .send(userFaker);

        const user = response.body;
        expect(response.status).toBe(201);
        expect(user).not.toBeNull();
        expect(user.id).toBeDefined();
        expect(user.name).toBe(userFaker.name);
        expect(user.email).toBe(userFaker.email);
    });

    it('não deveria retonar o campo "password" no retorno do cadastro de usuário.', async () => {
        const userFaker = userFactory();

        const response = await request(app)
            .post('/users')
            .send(userFaker);

        const user = response.body
        expect(response.status).toBe(201)
        expect(user).not.toBeNull()
        expect(user.password).toBeUndefined()
    });

    it('deveria não permitir cadastrar users com um email existente.', async () => {
        const userFaker = userFactory();

        const response = await request(app)
            .post('/users')
            .send(userFaker);

        expect(response.status).toBe(201);

        const response2 = await request(app)
            .post('/users')
            .send(userFaker);

        expect(response2.status).toBe(400)
        expect(response2.body).not.toBeNull()
        expect(response2.body.error).toBeDefined()
        expect(response2.body.error.message).toBeDefined()
        expect(response2.body.error.message).toBe('Email já existe!')
    });
})