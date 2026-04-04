# Gerador de Senhas

Este projeto é um gerador de senhas desenvolvido como atividade para a disciplina de Desenvolvimento para Dispositivos Móveis. Ele inclui:

- um frontend em React Native / Expo;
- um backend em Node.js com Express;
- persistência em banco de dados MySQL.

## Funcionalidades

- Cadastro de usuário (`signup`).
- Login de usuário (`signin`).
- Criptografia de senha com `bcrypt`.
- Geração de token JWT no login.
- Integração com MySQL para armazenar dados de usuários.
- Geração de senhas no aplicativo.
- Armazenamento local do histórico de senhas geradas.

## Pré-requisitos

- Node.js instalado.
- MySQL Server instalado e rodando.
- `npm` disponível.
- Opcional: Expo Go em um dispositivo móvel ou emulador para rodar o app nativo.

## Instalação e Execução

1. Clone o repositório e abra a pasta do projeto:

   ```bash
   git clone https://github.com/isabelaspaz/GeradorDeSenha.git
   cd GeradorDeSenha

2. Instale as dependências do backend:

   ```bash
   cd backend
   npm install
   cd ..

3. Instale as dependências do frontend na raiz do projeto:

   ```bash
   npm install

4. Crie o banco de dados no MySQL:

   ```bash
   CREATE DATABASE gerador_senha;
   ```

   Verifique a configuração no arquivo backend/db.js e ajuste, se necessário, os dados de conexão com o MySQL, como host, user, password e database.

5. O arquivo .env é opcional. Se você quiser personalizar a porta ou a chave JWT, crie um arquivo .env dentro da pasta backend com o conteúdo abaixo:

   ```bash
      JWT_SECRET=senhaSecreta
      PORT=3000
   ```

   Se o arquivo .env não for criado, o projeto usará a configuração padrão definida no código.

6. Inicie o backend em um terminal, dentro da pasta backend:

   ```bash
   cd backend
   npm start
   ```

   O servidor rodará em http://localhost:3000

7. Em outro terminal, na raiz do projeto, inicie o frontend Expo:

```bash
npx expo start
```

O Expo exibirá as opções para abrir o aplicativo no navegador, emulador ou celular.

## Endpoints principais do backend

- `POST /signup`
  - Body: `{ nome, email, senha, confirmarSenha }`
  - Cria um novo usuário.

- `POST /signin`
  - Body: `{ email, senha }`
  - Autentica o usuário e retorna um token JWT.

## Estrutura do Projeto

- `backend/`
  - `server.js`: servidor Express.
  - `db.js`: configuração do MySQL.
  - `package.json`: dependências e scripts do backend.
- `App.js`, `package.json`, `app.json`: frontend Expo.
- `components/`: componentes React Native.
- `screens/`: telas da aplicação.
- `services/`: serviços de apoio, incluindo armazenamento local.

## Tecnologias Utilizadas

- Backend: Node.js, Express, MySQL2, bcryptjs, jsonwebtoken, dotenv, cors e body-parser.
- Frontend: React Native, Expo, React Navigation e AsyncStorage.
- Banco de Dados: MySQL.

## Observações

- O backend usa MySQL e espera que o banco `gerador_senhas` exista.
- O arquivo `.env` é opcional, pois o projeto possui configuração padrão no código.
- As senhas dos usuários são armazenadas de forma criptografada com `bcrypt`.
- O histórico das senhas geradas é armazenado localmente no aplicativo.

## Licença

Projeto para fins educacionais.
   
