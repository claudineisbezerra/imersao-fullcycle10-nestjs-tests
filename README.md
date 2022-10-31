![Imersão Full Stack && Full Cycle](https://events-fullcycle.s3.amazonaws.com/events-fullcycle/static/site/img/grupo_4417.png)

Participe gratuitamente: https://imersao.fullcycle.com.br/

## Sobre o repositório

Esse repositório contém o código-fonte ministrado nas aulas:

- Desenvolvimento de APIs com Nest.js: Do zero aos testes automatizados: [https://www.youtube.com/watch?v=yggaGQnsnxo](https://www.youtube.com/watch?v=yggaGQnsnxo)
- Docker avançado no VSCode: [https://www.youtube.com/watch?v=oAcrXHRAqoY](https://www.youtube.com/watch?v=oAcrXHRAqoY)
- CI/CD: Fazendo deploy de uma aplicação Nest.js no mundo real: [https://www.youtube.com/watch?v=89GWF72F0sw](https://www.youtube.com/watch?v=89GWF72F0sw)

Durante estas 3 aulas, mostramos como:

- Desenvolver API Rest e testes automatizados (pirâmide de testes) com Nest.js
- Como montar um ambiente de desenvolvimento com Docker no VSCode satisfazendo necessidades como: backup dos banco de dados de dados em volumes, tmpfs para testes, terminal ZSH dentro do container e Remote Container
- Como montar uma esteira de CI/CD (Integração Contínua e Deploy Contínuo) usando Github Action, Github Packages, Artifact Registry e Cloud Run

## Rodar a aplicação

```bash
# para levantar a versão default
docker compose up

# para levantar a versão conforme o ambiente
docker compose -f docker-compose.dev.yaml up --build
docker compose -f docker-compose.prod.yaml up --build
```

Entre no container do Nest.js para levantar o servidor WEB:

```bash
# Acessar o container diretamente para CLI commands
docker compose -f docker-compose.dev.yaml exec app bash
npm run start:dev

# versão de produção
docker compose -f docker-compose.prod.yaml exec app bash
npm run start:prod
```

Use o arquivo `api.http` para testar a publicação usando a extensão Rest Client do VSCode ou outra ferramenta para brincar com o HTTP.

## Comandos

- Utiliza o Github Actions para disparar os gatilhos de CI/CD.
- Monta exemplo utilizando o Github Packages como Container Registry.
- Monta exemplo uilizando o Google Artifact Registry / (GCR-Google Container Registry) e Google Cloud Run como
- Container Registry.

# Build da imagem para PRODUÇÃO no ambiente local [apenas para teste]

```bash
docker build -t nestjs-api -f Dockerfile.dev .
docker ps -a | grep nestjs-api
docker rm imersao-fullcycle10-nestjs-tests-mongo-express-1 imersao-fullcycle10-nestjs-tests-db-1

docker image ls | grep nestjs-api
docker rmi nestjs-api

docker build -t nestjs-api -f Dockerfile.prod .
```

# Verifica a criação de imagem recem criada

```bash
docker image ls | grep nestjs-api
```

# Subir o ambiente e compilar a aplicação

```bash
docker compose -f docker-compose.dev.yaml down            #Destruir o ambiente
docker compose -f docker-compose.dev.yaml up -d           #Subir o ambiente com terminal detachado
docker compose -f docker-compose.dev.yaml up --build      #Subir o ambiente compilando a aplicação
docker compose -f docker-compose.dev.yaml up -d --build   #Subir o ambiente com terminal detachado compilando a aplicação
docker compose -f docker-compose.dev.yaml --profile development up --build #Cria o ambiente baseado em profile


docker compose -f docker-compose.dev.yaml exec app bash
npm run start:dev


docker compose -f docker-compose.prod.yaml up
docker compose -f docker-compose.prod.yaml up --build
```
