# Gerador de Senhas

Este projeto foi desenvolvido como atividade da disciplina de Desenvolvimento para Dispositivos Móveis. Trata-se de um gerador de senhas com frontend em React Native/Expo e backend em Node.js com integração ao MySQL.

Na versão final do projeto, o sistema permite cadastro e autenticação de usuários, geração de senha aleatória, gravação das senhas no banco de dados, listagem dos itens salvos e exclusão dos itens cadastrados.

## Funcionalidades

- Criação de conta
- Login de usuário
- Geração de senha aleatória
- Gravação de senha no banco de dados
- Listagem das senhas salvas por usuário
- Exclusão de senha
- Validações de formulário no cadastro, login e salvamento

## Tecnologias utilizadas

### Frontend

- React Native
- Expo
- Expo Web
- NativeWind
- Tailwind CSS

### Backend

- Node.js
- Express.js
- JWT
- bcryptjs

### Banco de dados

- MySQL

### Containerização

- Docker
- Docker Compose
- Nginx

## Estrutura do projeto

```text
GeradorDeSenha/
├─ backend/                 # servidor Node.js, rotas e conexão com banco
├─ frontend/                # aplicação React Native/Expo
│  ├─ screens/              # telas do aplicativo
│  ├─ services/             # serviços auxiliares
│  ├─ components/           # componentes reutilizáveis
│  ├─ assets/               # imagens e recursos visuais
│  ├─ babel.config.js       # configuração do Babel
│  ├─ tailwind.config.js    # configuração do Tailwind/NativeWind
│  ├─ metro.config.js       # configuração do Metro com NativeWind
│  ├─ global.css            # diretivas globais do Tailwind
│  ├─ Dockerfile            # build do frontend web
│  └─ package.json          # dependências do frontend
├─ mysql/
│  └─ init/
│     └─ 01-schema.sql      # script de inicialização do banco
├─ docker-compose.yml       # orquestração dos containers
└─ README.md
```

## Como executar o projeto

Pré-requisitos:
Docker Desktop instalado e em execução.

Passos:

Clone o repositório:

```bash
git clone https://github.com/isabelaspaz/GeradorDeSenha.git
cd GeradorDeSenha
```

Execute:

```bash
docker compose up --build
```

Acesse no navegador:

```bash
Frontend: http://localhost:8080
Backend: http://localhost:3001
```

## Verificação do backend

Se o backend estiver funcionando corretamente, a rota abaixo deve responder:

```bash
http://localhost:3001/
```

Resposta esperada:

```bash
API está rodando!
```
