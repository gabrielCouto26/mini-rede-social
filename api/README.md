## Instalação

Na raíz do projeto:
1. Instale os módulos do Node.js: `npm install`
2. Builde as imagens Docker: `docker-compose build`

## Rodando o projeto

1. Suba a aplicação: `docker-compose up`
2. Entre no container: `docker exec -it api bash`
3. Crie o banco: `npx sequelize db:create`
4. Rode as migrations: `npx sequelize db:migrate`


### Ambiente de teste

1. Com a aplicação rodando, entre no container: `docker exec -it api bash`
2. Configure o banco de teste: `export POSTGRES_DB=test`
3. Crie o banco: `npx sequelize db:create`
4. Rode as migrations: `npx sequelize db:migrate`
5. Rode os testes: `npm test`
