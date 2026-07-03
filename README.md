# API Studio de Jogos 🎮

Projeto final desenvolvido como requisito de avaliação para a disciplina de **Desenvolvimento de Sistemas Web**, do **5º Semestre** do curso da **Unicentro**.

## 👨‍🎓 Autor
**Patrick** 
Universidade Estadual do Centro-Oeste (Unicentro)

## 📌 Sobre o Projeto
Esta é uma API RESTful completa desenvolvida para gerenciar um catálogo de estúdios desenvolvedores de jogos e seus respectivos títulos. A aplicação permite realizar operações de CRUD (Create, Read, Update, Delete) completas e conta com um sistema de autenticação via Token JWT para proteger as rotas.

A estrutura do banco de dados relacional (PostgreSQL) define que **um estúdio pode ter vários jogos (1:N)**, implementando regras de negócio integradas como exclusão em cascata (se um estúdio for deletado, todos os jogos dele são deletados automaticamente).

## 🚀 Funcionalidades

### 👤 Usuários e Autenticação
- Criação de novos usuários com senha criptografada (`bcryptjs`).
- Autenticação e geração de sessão com Token JWT.
- Rotas protegidas (Middleware) exigindo `Bearer Token`.

### 🏢 Estúdios
- **Criar**: Cadastro de novos estúdios (nome, país, ano de fundação, fundador, website).
- **Listar**: Retorna todos os estúdios cadastrados.
- **Mostrar Detalhes**: Retorna as informações de um estúdio específico por ID.
- **Atualizar**: Edita as informações de um estúdio.
- **Deletar**: Remove o estúdio e todos os seus jogos associados do banco.

### 🕹️ Jogos
- **Criar**: Vincula e cadastra um novo jogo a um estúdio específico (título, gênero, data de lançamento, plataforma e preço).
- Validação customizada de datas no padrão brasileiro (`DD/MM/YYYY`).
- **Listar**: Retorna o catálogo completo de jogos, incluindo as informações do estúdio que o produziu.
- **Mostrar Detalhes**: Retorna as informações completas de um jogo específico.
- **Atualizar**: Modifica os dados de um jogo já existente.
- **Deletar**: Remove o jogo do banco de dados.

## 🛠️ Tecnologias e Ferramentas Utilizadas
- **Linguagem:** TypeScript / Node.js
- **Framework Web:** Express
- **Banco de Dados:** PostgreSQL (Rodando em container via Docker)
- **ORM:** TypeORM (Migrações e Entidades)
- **Autenticação:** JSON Web Token (JWT)
- **Validação de Dados:** Celebrate / Joi
- **Ferramentas de Desenvolvimento:** 
  - `ts-node-dev` (Reload automático)
  - Insomnia / Postman (Para testes da API)
  - DBeaver (Visualização do banco)

## ⚙️ Como executar o projeto

1. **Clone o repositório e instale as dependências:**
```bash
git clone https://github.com/patr0ka/API-Games.git
cd API-Games/api-studio-jogos
npm install
```

2. **Configure o Banco de Dados (PostgreSQL):**
Certifique-se de que o banco de dados `studio_jogos_db` está criado e rodando.
A conexão atual aponta para o `localhost` na porta `1234` com as credenciais padrões do projeto.

3. **Rode as Migrations (Criação das tabelas):**
```bash
npm run typeorm migration:run
```

4. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

A API estará rodando em `http://localhost:3333`.
