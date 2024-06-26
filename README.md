
# Sistema de Gerenciamento de Empréstimos de Livros

Este sistema foi projetado para gerenciar o empréstimo de livros para os alunos de uma universidade. Ele é baseado em um banco de dados que armazena informações sobre alunos, livros, colaboradores da biblioteca e empréstimos. O sistema facilita o processo de empréstimo e devolução de livros, permitindo um controle eficiente e organizado das atividades da biblioteca universitária.

## Tecnologias Utilizadas

- **Fastify**: Framework web rápido e eficiente para Node.js, utilizado para criar a API RESTful.
- **Prisma**: ORM moderno para Node.js e TypeScript, utilizado para gerenciar a camada de persistência de dados no banco de dados MySQL.
- **MySQL**: Banco de dados relacional utilizado para armazenar os dados do sistema.
- **Zod**: Biblioteca TypeScript-first para validação de esquemas e tipos, garantindo a integridade dos dados recebidos pela API.
- **Docker / Docker Compose**: Utilizados para gerenciar e distribuir os contêineres da aplicação.

## Requisitos Funcionais
- [x]  Deve ser possível se cadastrar;
- [x]  Deve ser possível se autenticar;
- [x]  Deve ser possível Realizar uma busca de alunos com suporte a paginação.
- [x]  Deve ser possível Permitir que um aluno escolha um livro da biblioteca.
- [x]  Deve ser possível Buscar e listar os livros emprestados relacionados a um aluno específico.
- [x]  Deve ser possível Permitir que um colaborador realize o empréstimo de um livro usando o RA (Registro Acadêmico) do aluno e o CPF do colaborador.
- [x]  Deve ser possível Permitir que o colaborador faça o empréstimo e retorne uma nota com o ID do empréstimo.
- [x]  Deve ser possível o colaborador faça uma busca da nota do emprestimo.
- [x]  Deve ser possível Permitir que o aluno devolva um livro.

## Regras de Negócio

- [x]  Garantir que cada livro tenha um ISBN único
- [x]  Garantir que apenas um colaborador pode realizar o empréstimo de um livro
- [x]  Identificar o usuário em todas as requisições, implementando autenticação e autorização
- [x]  Gerenciar a quantidade de exemplares de cada livro disponíveis na biblioteca

## Requisitos Não Funcionais

- [x]  A senha do usuário precisa estar criptografada
- [x]  O usuário deve ser identificado por um JWT (JSON Web Token)

## Instalação

### Pré-requisitos

- Node
- Docker
- Docker Compose

### Passos para Instalação
1. Clone o repositório e instale as dependências:

   ```sh
   npm i
   git clone https://github.com/BarreraPeres/Back-End-Node.Js.git
   cd Back-End-Node.Js/

2. Construa e inicie os contêineres Docker:
 
    ```sh
   docker-compose build
   docker-compose up

3. Documentação da API (Swagger): 
A documentação da API está disponível através do Swagger UI. Após iniciar o servidor, você pode acessá-la em:
   ```sh
   http://localhost:8080/docs

