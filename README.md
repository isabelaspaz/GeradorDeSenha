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
├─ screens/                 # telas do aplicativo
├─ services/                # serviços auxiliares
├─ components/              # componentes reutilizáveis
├─ assets/                  # imagens e recursos visuais
├─ mysql/
│  └─ init/
│     └─ 01-schema.sql      # script de inicialização do banco
├─ Dockerfile.frontend      # build do frontend web
├─ docker-compose.yml       # orquestração dos containers
├─ nginx.conf               # configuração do frontend web
├─ package.json             # dependências do frontend
└─ README.md
```

## Como executar o projeto

## Pré-requisitos: 
- Docker Desktop instalado e em execução.

## Passos

1. Clone o repositório:

```bash
git clone https://github.com/isabelaspaz/GeradorDeSenha.git
cd GeradorDeSenha
```

2. Execute:

```bash
docker compose up --build
```

3. Acesse no navegador:
- Frontend: http://localhost:8080
- Backend: http://localhost:3001

## Verificação do backend
Se o backend estiver funcionando corretamente, a rota abaixo deve responder:

```bash
http://localhost:3001/
```

Resposta esperada:

```bash
API está rodando!
```
