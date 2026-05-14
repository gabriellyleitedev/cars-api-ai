# Cars API - Intelligent Search System

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Fastify](https://img.shields.io/badge/fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)](https://www.fastify.io/)
[![Drizzle](https://img.shields.io/badge/Drizzle-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)](https://orm.drizzle.team/)

Uma API RESTful de alta performance desenvolvida para o gerenciamento de inventário automotivo, apresentando uma camada de inteligência artificial para busca semântica e processamento de linguagem natural.

## Diferenciais do Projeto

- **Busca Inteligente (AI-Powered):** Integração com modelos da OpenAI para interpretar intenções de busca do usuário e converter linguagem natural em filtros estruturados de banco de dados.

- **Arquitetura Modular:** Design orientado a domínios (Domain-Driven Design simplificado), garantindo baixo acoplamento e alta testabilidade.

- **Type Safety Extrema:** Uso do Zod para validação de runtime e TypeScript para tipagem estática em toda a pipeline de dados, do banco ao controller.

- **Performance:** Construído sobre o Fastify, o framework web mais rápido para o ecossistema Node.js.
- 

## Tecnologias e Ferramentas

- **Runtime:** Node.js v20+

- **Framework:** Fastify

- **Linguagem:** TypeScript

- **ORM:** Drizzle ORM (PostgreSQL)

- **Validação:** Zod

- **IA:** OpenAI API (GPT-4/3.5)

- **Database:** PostgreSQL


## 📂 Estrutura Arquitetural

O projeto segue uma estrutura modular onde cada domínio (ex: `cars`) encapsula sua própria lógica

- `src/modules`: Divisão por domínios de negócio.

    - `controller`: Orquestração de entrada/saída e validação HTTP.

    - `service`: Camada de regras de negócio e integrações (IA).

    - `repository`: Abstração de persistência e queries específicas.

    - `schema`: Definições de contratos de dados (Zod).

- `src/db`: Gerenciamento de conexão, migrations e schemas do banco de dados.

- `src/config`: Centralização de variáveis de ambiente e configurações globais.

## ⚙️ Configuração e Instalação

Siga os passos abaixo para configurar e rodar o projeto localmente.

---

## Clonar o repositório

```bash

git clone https://github.com/gabriellyleitedev/cars-api-ai

cd cars-api-ai

````

## Instalar dependências

```bash

npm install

```

## Configurar Variáveis de Ambiente

```bash

cp .env.example .env

```

## Executar Migrations

```bash

npx drizzle-kit push

```


## Iniciar Servidor

```bash

npm run dev
