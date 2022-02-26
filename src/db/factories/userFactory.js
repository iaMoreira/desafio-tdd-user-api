const { faker } = require('@faker-js/faker');

module.exports = () => {
    return {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    }
}
