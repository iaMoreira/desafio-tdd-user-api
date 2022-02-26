const request = require('supertest')
const { userFactory } = require('../../../src/db/factories')
const app = require('../../../src/app')

const helpers = {
    criaUser: async () => {
        const userFaker = userFactory();

        const response = await request(app)
                            .post('/users')
                            .send(userFaker);
        
        return response.body;
    } 

}

module.exports = helpers