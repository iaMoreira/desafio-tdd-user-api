const request = require('supertest')
const truncate = require('../../utils/truncate')
const app = require('../../../src/app')
const helpers = require('./helpers')

describe('List Users', () => {
    beforeEach(async () => {
        await truncate();
    });


    it('deveria retornar uma lista de usuários ordenada pelo nome na ordem alfabética.', async () => {
        const users = [];

        users.push(await helpers.criaUser());
        users.push(await helpers.criaUser());
        users.push(await helpers.criaUser());

     
        users.sort(function (a, b) {
            return a.localeCompare(b)
        });

        const response = await request(app)
            .get('/users')
            .send()
        
        expect(response.status).toBe(200);
        expect(response.body).not.toBeNull();
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(users.length);

        expect(response.body).toStrictEqual(users)
    });
})
