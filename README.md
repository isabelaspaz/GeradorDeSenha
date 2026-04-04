# Gerador de Senhas

Este projeto é um gerador de senhas desenvolvido como atividade para a disciplina de Desenvolvimento para Dispositivos Móveis. Ele possui um frontend em React Native/Expo e um backend em Node.js com integração ao MySQL para armazenamento dos usuários.

## Funcionalidades

- Geração de senhas seguras.
- Cadastro e login de usuários.
- Armazenamento local do histórico de senhas por usuário.
- Backend integrado ao MySQL para autenticação e persistência de usuários.

## Pré-requisitos

- Node.js instalado.
- MySQL Server instalado e em execução.
- Um cliente MySQL, como MySQL Workbench, para gerenciar o banco de dados.
- Navegador web para executar o frontend com Expo Web.

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/isabelaspaz/GeradorDeSenha.git
   cd GeradorDeSenha
   ```

2. Instale as dependências do frontend, na pasta raiz do projeto:

   ```bash
   npm install
   ```

4. Instale as dependências do backend:

   ```bash
   cd backend
   npm install
   ```

5. Crie o banco de dados no MySQL:

   ```bash
   CREATE DATABASE gerador_senhas;
   ```

   Verifique a configuração do arquivo backend/db.js.


## Como rodar:

1. Inicie o backend:

   ```bash
   cd backend
   node server.js
   ```

2. Em outro terminal, acesse a pasta raiz do projeto e execute:

   ```bash
   npm.cmd run web
   ```

## Estrutura para execução:

- Backend: executar na pasta backend;
- Frontend: executar na pasta raiz do projeto.

## Tecnologias utilizadas:

- Frontend: React Native, Expo.
- Backend: Node.js, Express.js, MySQL2.
- Banco de dados: MySQL.

## Estrutura do projeto:
- backend/: código do servidor, conexão com banco e rotas de autenticação.
- screens/: telas do aplicativo.
- services/: funções auxiliares de armazenamento local.
- components/: componentes reutilizáveis da interface.

