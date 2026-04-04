# Gerador de Senhas

Este projeto é um gerador de senhas desenvolvido como atividade para a disciplina de Desenvolvimento para Dispositivos Móveis. Ele inclui um backend em Node.js com integração ao MySQL para armazenamento de dados, e um frontend web simples para interação com a API.

## Funcionalidades

- Geração de senhas seguras.
- Armazenamento de senhas geradas no banco de dados MySQL.
- Interface web para gerar, salvar e visualizar senhas.

## Pré-requisitos

- Node.js (versão 14 ou superior) instalado.
- MySQL Server instalado e rodando.
- Um cliente MySQL (como MySQL Workbench) para gerenciar o banco de dados.
- Navegador web para acessar o frontend.

## Instalação

1. Clone o repositório:
   ```
   git clone https://github.com/isabelaspaz/GeradorDeSenha.git
   cd GeradorDeSenha
   ```

2. Instale as dependências do backend:
   ```
   cd backend
   npm install
   cd ..
   ```

3. Instale as dependências do frontend (na pasta raiz):
   ```
   npm install
   ```

## Configuração do Banco de Dados

1. Crie o banco de dados no MySQL:
   ```
   CREATE DATABASE gerador_senha;
   ```

2. Execute os scripts SQL para criar as tabelas (se houver um arquivo `schema.sql` na pasta `backend`):
   ```
   mysql -u root -p gerador_senha < backend/schema.sql
   ```

3. Verifique a configuração no arquivo `backend/db.js` (certifique-se de que host, user e password estão corretos; padrão: host='localhost', user='root', password='root').

## Como Rodar

1. Inicie o servidor backend:
   ```
   cd backend
   npm start
   ```
   O servidor rodará na porta 3000.

2. Inicie o frontend web (na pasta raiz):
   ```
   npm run web
   ```
   Abra o navegador no endereço exibido.

## Endpoints da API

- `GET /senhas`: Lista todas as senhas salvas (retorna array de objetos com `id` e `senha`).
- `POST /senhas`: Gera e salva uma nova senha (envie JSON com `senha` no body; retorna a senha salva).

## Tecnologias Utilizadas

- Backend: Node.js, Express.js, MySQL2.
- Frontend: HTML, CSS, JavaScript.
- Banco de Dados: MySQL.

## Estrutura do Projeto

- `backend/`: Código do servidor (db.js, server.js, etc.).
- `index.html`, `app.js`, `package.json`: Frontend web na raiz.

## Licença

Este projeto é para fins educacionais.
