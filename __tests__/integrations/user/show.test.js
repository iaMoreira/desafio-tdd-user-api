const request = require('supertest')
const truncate = require('../../utils/truncate')
const app = require('../../../src/app')
const helpers = require('./helpers')

describe('Show User', () => {
    beforeEach(() => {
        truncate()
    })
    
    it('deveria retornar um erro quando tentarmos PEGAR um usuário com um id inválido', async () => {
        const fakeID = 20;

        const response = await request(app)
                            .get('/users/' + fakeID)
                            .send();

        expect(response.status).toBe(404);
        expect(response.body).not.toBeNull();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toBeDefined();
        expect(response.body.error.message).toBe("O usuário de id = " + fakeID + " não foi encontrado.");
    });

    it('deveria recuperar um usuário executando um GET em /users/:id, sendo um usuário já cadastrado', async () => {
        const user = await helpers.criaUser();

        const response = await request(app)
                            .get('/users/' + user.id)
                            .send()

        expect(response.status).toBe(200);
        expect(response.body).not.toBeNull();
        expect(response.body.id).toBe(user.id);
    });

})