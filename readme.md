# Desafio User API

## Sobre o desafio 

Faça o deafio!


### Execute os testes

Executar todos os testes dentro `__tests__`
````bash
npm test
````

Selecionar apenas um arquivo de teste, para testar individualmente:

````bash
npx jest ./__tests__/integrations/user/create.test.js
````

## Como Esse projeto foi desenvolvido


Inicialize o projeto:
````
npm init -y
````

Instale as dependecias principais do projeto:

````
npm i express dotenv sequelize @faker-js/faker uuid bcrypt
````

Instale as dependências de desenvolvimento do projeto:

````
npm i jest sqlite3 supertest -D 
````


### Inicializando o Sequelize

O Sequelize vai ser nossa ferramenta para facilitar nosso acesso ao banco.


Primeiro vamos criar nosso arquivo de configuração do `sequelize` para poder organizarmos os arquivos gerados automaticamente nos seus devidos lugares. Começamos com o arquivo `.sequelizerc`:

````js
// .sequelizerc

const path = require("path");

module.exports = {
  'config': path.resolve('config', 'database.json'),
  'models-path': path.resolve('src', 'db', 'models'),
  'seeders-path': path.resolve('src', 'db', 'seeders'),
  'migrations-path': path.resolve('src', 'db', 'migrations')
};
````

Agora vamos executar o `sequelize-cli`:

````powershell
npx sequelize-cli init
````

Alteramos o `config/database.js` para ele se adequar ao a nossa estrutura. 

````js
// config/database.js
const dotenv = require('dotenv')
dotenv.config({
    path: process.env.NODE_ENV == 'test' ? '.env.test' : '.env'
})

module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  storage: './__tests__/database.sqlite',
  logging: false
}

````

### Variáveis de ambiente

Nosso ambiente de desenvolvimento vai rodar com as configurações
do `.env` 

````properties
# .env
DB_HOST=127.0.0.1
DB_USER=root
DB_PASS=
DB_NAME=test
DB_DIALECT=mysql

PORT=3000
````

E para o nosso ambiente de teste vamos ter o arquivo `.env.test`

````properties
# .env.test
DB_DIALECT=sqlite
````

### Configurando o Jest

````properties
npx jest --init
````
