const request = require('supertest')
const truncate = require('../../utils/truncate')
const app = require('../../../src/app')
const helpers = require('./helpers')

describe('Delete User', () => {
    beforeEach(() => {
        truncate()
    })
    
    it('deveria retornar um erro quando tentarmos DELETAR um usuário com um id inválido.', async () => {
        const fakeID = 1;

        const response = await request(app)
                            .delete('/users/' + fakeID)
                            .send();

        expect(response.status).toBe(404);
        expect(response.body).not.toBeNull();
        expect(response.body.error).toBeDefined();
        expect(response.body.error.message).toBeDefined();
        expect(response.body.error.message).toBe("O usuário de id = " + fakeID + " não foi encontrado.");
    });

    it('deveria deletar um usuário quando excutarmos um DELETE em /users/:id, sendo um usuário já cadastrado.', async () => {
        const user = await helpers.criaUser();

        const response = await request(app)
                            .delete('/users/' + user.id)
                            .send();

        expect(response.status).toBe(204);

        const response2 = await request(app)
                            .get('/users/' + user.id)
                            .send();

        expect(response2.status).toBe(404);
    });

})