## Instalação

Na raíz do projeto:
1. Builde a imagem Docker: `docker-compose build`

## Rodando o projeto

1. Crie um arquivo *.env*. Veja um exemplo na sessão *Arquivo .env*.
2. Suba a aplicação: `docker-compose up`
3. Entre no container: `docker exec -it api bash`
4. Crie o banco: `npx sequelize db:create`
5. Rode as migrations: `npx sequelize db:migrate`
6. Para encerrar, interrompa a aplicação: `CTRL+C e docker-compose down, em seguida.`

Talvez seja necessário adicionar permissão para a pasta `database/data`. 
Para isso, execute o comando `sudo chown -R $USER:$USER database/data` fora do container.

## Ambiente de teste

1. Com a aplicação rodando, entre no container: `docker exec -it api bash`
2. Configure o banco de teste: `export POSTGRES_DB=test`
3. Crie o banco: `npx sequelize db:create`
4. Rode as migrations: `npx sequelize db:migrate`
5. Rode os testes: `npm test`


## Arquivo .env
Exemplo:
- NODE_ENV=development
- PORT=4000
- POSTGRES_DB=
- POSTGRES_USER=
- POSTGRES_PASSWORD=
- POSTGRES_HOST=postgresql
- POSTGRES_PORT=5432