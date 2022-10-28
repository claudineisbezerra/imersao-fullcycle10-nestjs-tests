#!/bin/bash
npm install

#tail -f /dev/null -> Este comando 'mantem o container de pé' 
#                     para evitar que o container termine após finalizar todos os comandos.
#                     Neste caso não estamos iniciando a aplicação (start).
tail -f /dev/null


# Poderia substituir 'tail -f /dev/null' por 'npm run start:dev' para executar o nestjs
