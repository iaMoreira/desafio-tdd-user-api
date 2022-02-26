const request = require('supertest')
const truncate = require('../../utils/truncate')
const { userFactory } = require('../../../src/db/factories')
const app = require('../../../src/app')
const helpers = require('./helpers')

describe('Update User', () => {
    beforeEach(() => {
        truncate()
    })

    it('deveria retornar um erro quando tentarmos atualizar um usuário com um id inválido.', async () => {
        const userFaker = userFactory();

        const fakeID = 20;

        const response = await request(app)
                            .put('/users/' + fakeID) // Lembrando que 3 é um id inválido, pq todos os users foram deletados
                            .send(userFaker);

        expect(response.status).toBe(404);
        expect(response.body).not.toBeNull();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toBeDefined();
        expect(response.body.error.message).toBe("O usuário de id = " + fakeID + " não foi encontrado.");
    });

    it('deveria atualizar um usuário executando um PUT em /users/:id, sendo um user já cadastrado', async () => {
        const user = await helpers.criaUser(); // antigo
        const userFaker = userFactory(); // novo

        const response = await request(app)
            .put('/users/' + user.id)
            .send({name: userFaker.name, description: userFaker.description});
        
        expect(response.status).toBe(200);
        expect(user.id).toBeDefined();
        expect(response.body).not.toBeNull();
        expect(response.body.name).toBeDefined();
        expect(response.body.name).toBe(userFaker.name);
        expect(response.body.email).toBeDefined();
        expect(response.body.email).toBe(userFaker.email);

    });

    it('deveria não retonar o campo password no retorno da atualização do usuário ', async () => {
        const userFaker = userFactory();

        const response = await request(app)
            .post('/users')
            .send(userFaker);

        const user = response.body
        expect(response.status).toBe(201)
        expect(user).not.toBeNull()
        expect(user.password).toBeUndefined()
    });

    it('deveria não permitir atualizar users com um email existente.', async () => {
        const user = await helpers.criaUser();
        const userExistingEmail= await helpers.criaUser();

        const response2 = await request(app)
            .put('/users/' + user.id)
            .send({name: user.name, email: userExistingEmail.email, password: '1234'});

        expect(response2.status).toBe(400)
        expect(response2.body).not.toBeNull()
        expect(response2.body.error).toBeDefined()
        expect(response2.body.error.message).toBeDefined()
        expect(response2.body.error.message).toBe('Email já existe!')
    });

})