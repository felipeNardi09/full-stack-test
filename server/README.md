## Desafio Mytapp Backend

Esta é uma simples API de CRUD de usuários consumida pelo frontend do desafio. Possui rotas para criar usários, fazer o login, atualizar, deletar, listar todos os usuários e listar somente um usuário por id. A API é integrada ao Postgres e tecnologias utilizadas no projeto são:
-   NodeJS;
-   Express;
-   Typescript;
-   PrismaORM;
-   JsonWebToken;
-   Docker;

env server:
```
DATABASE_URL="postgresql://postgres:1234@localhost:5432/mytapptest?schema=public"
JWT_SECRET=0g42hg943hg394gh349gh39bvh347uvhbre9h347hgb932b42
```
## Instalação e Execução
Istale as dependências do projeto
```
npm install
```
Generate Prisma Client
```
 npx prisma generate --schema src/prisma/schema.prisma
```
Gerar migrações
```
npx prisma migrate dev --schema src/prisma/schema.prisma
```
Execute o container
```
docker-compose up
```
Execute o projeto
```
npm run dev
```
## Endpoints:

-   Sign up:
  Cria um usuário e retorna as informações do usuário e um jsonwebtoken(jwt).
```
'/api/v1/users/signup'
```
-   Login:
  Retorna as informações do usuário e um jwt.
```
'/api/v1/users/login'
```
-   Listar todos os usuários:
  Lista todos os usuários registrados. Necessita autenticação(jwt).
```
'/api/v1/users'
```
-   Listar usuário por id:
  Lista o usuário que possui o id passado como parâmetro. Necessita autenticação(jwt).
```
'/api/v1/users/user/:id'
```
-   Listar usuário logado:
  Lista as informações do usuário através do token de autenticação. Necessita autenticação(jwt).
```
'/api/v1/users/user/logged-user'
```
-   Listar usuário logado:
 Atualiza as informações do usuário. Necessita autenticação(jwt).
```
'/api/v1/users/user/update-user'
```
-  Deleta o usuário cadastrado:
 Deleta o usuário com base no payload do token. Necessita autenticação(jwt) e deleta o usuário deletado.
```
'/api/v1/users/user/delete-user'
```
