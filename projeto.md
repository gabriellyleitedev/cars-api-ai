# Documentação do Projeto Backend Node

## Introdução

Este projeto é um backend desenvolvido em Node.js com TypeScript, utilizando o framework Fastify para criar uma API RESTful. O objetivo principal é gerenciar dados de carros, com funcionalidades de criação de registros e busca por texto natural. A arquitetura segue um padrão modular, separando responsabilidades em camadas distintas para facilitar a manutenção e escalabilidade.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Fastify**: Framework web rápido e eficiente para Node.js, usado para criar o servidor HTTP.
- **Drizzle ORM**: ORM (Object-Relational Mapping) para interagir com o banco de dados PostgreSQL de forma tipada e segura.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.
- **Zod**: Biblioteca para validação e parsing de esquemas de dados.
- **Dotenv**: Para gerenciamento de variáveis de ambiente.
- **@fastify/cors**: Plugin para habilitar CORS (Cross-Origin Resource Sharing).
- **OpenAI**: Integração com a API da OpenAI (aparentemente para futuras funcionalidades, como geração de conteúdo).
- **Drizzle Kit**: Ferramenta para migrações de banco de dados.
- **TSX**: Executor de TypeScript para desenvolvimento.

## Arquitetura Geral

A arquitetura do projeto segue o padrão de **Separação de Camadas** e **Modularização**, inspirado em conceitos de Clean Architecture e MVC (Model-View-Controller), adaptado para APIs REST. Cada módulo (como "cars") é independente e contém suas próprias camadas:

- **Routes**: Define as rotas HTTP e conecta com o Controller.
- **Controller**: Recebe as requisições, valida os dados e chama o Service.
- **Service**: Contém a lógica de negócio.
- **Repository**: Interage diretamente com o banco de dados via ORM.
- **Schema**: Define os esquemas de validação (usando Zod) e os tipos TypeScript.

O servidor é iniciado em `server.ts`, que chama `buildApp()` de `app.ts` para configurar a aplicação Fastify. As configurações de ambiente são gerenciadas em `config/env.ts`, e o banco de dados é configurado em `db/client.ts`.

## Estrutura de Pastas

```
backend-node/
├── drizzle.config.ts          # Configuração do Drizzle ORM para migrações
├── package.json               # Dependências e scripts do projeto
├── tsconfig.json              # Configuração do TypeScript
└── src/
    ├── app.ts                 # Configuração principal da aplicação Fastify
    ├── server.ts              # Ponto de entrada do servidor
    ├── config/
    │   └── env.ts             # Validação e carregamento de variáveis de ambiente
    ├── db/
    │   ├── client.ts          # Cliente do banco de dados Drizzle
    │   ├── migrations/        # Migrações do banco de dados
    │   │   ├── 0000_acoustic_obadiah_stane.sql
    │   │   └── meta/
    │   └── schema/            # Esquemas das tabelas do banco
    │       ├── cars.ts        # Esquema da tabela "cars"
    │       └── index.ts       # Exportação dos esquemas
    └── modules/
        └── cars/              # Módulo para gerenciamento de carros
            ├── cars.controller.ts  # Controlador do módulo
            ├── cars.repository.ts  # Repositório do módulo
            ├── cars.routes.ts      # Rotas do módulo
            ├── cars.schema.ts      # Esquemas de validação Zod
            └── cars.service.ts     # Serviço do módulo
```

## Configurações

### TypeScript (tsconfig.json)
- **Módulo**: "nodenext" para suporte a módulos ES.
- **Target**: "esnext" para usar as últimas funcionalidades do JavaScript.
- **Strict**: Habilitado para verificação rigorosa de tipos.
- Outras opções incluem source maps, declarações de tipos e verificações adicionais para segurança de tipos.

### Ambiente (config/env.ts)
As variáveis de ambiente são validadas usando Zod:
- **PORT**: Porta do servidor (padrão 3333).
- **NODE_ENV**: Ambiente ("development", "production", "test").
- **DATABASE_URL**: URL de conexão com o PostgreSQL.
- **OPENAI_API_KEY**: Chave da API OpenAI.
- **OPENAI_MODEL**: Modelo da OpenAI a ser usado.

### Drizzle (drizzle.config.ts)
- **Dialect**: PostgreSQL.
- **Schema**: Aponta para `src/db/schema/index.ts`.
- **Out**: Pasta para migrações em `src/db/migrations`.
- **Credentials**: Usa `DATABASE_URL` do ambiente.

## Banco de Dados

### Cliente (db/client.ts)
- Usa `drizzle-orm/node-postgres` para conectar ao PostgreSQL.
- Cria um pool de conexões com `pg.Pool` para eficiência.
- O cliente Drizzle é configurado com o schema exportado de `schema/index.ts`.

### Schema (db/schema/cars.ts)
Define a tabela "cars" com os seguintes campos:
- **id**: UUID primário, gerado automaticamente.
- **brand**: Marca (varchar, 80 chars, obrigatório).
- **model**: Modelo (varchar, 120 chars, obrigatório).
- **version**: Versão (varchar, 120 chars, opcional).
- **year**: Ano (integer, obrigatório).
- **price**: Preço (numeric, 12 dígitos, 2 casas decimais, obrigatório).
- **fuel**: Combustível (varchar, 30 chars, opcional).
- **transmission**: Transmissão (varchar, 30 chars, opcional).
- **mileage**: Quilometragem (integer, opcional).
- **imageUrl**: URL da imagem (varchar, 2048 chars, opcional).
- **createdAt**: Data de criação (timestamp with timezone, padrão now).
- **updatedAt**: Data de atualização (timestamp with timezone, padrão now).

### Migrações
- Geradas pelo Drizzle Kit.
- A migração inicial cria a tabela "cars" conforme o schema definido.

## Módulos

### Módulo Cars

O módulo "cars" é responsável por gerenciar os dados de carros. Segue a arquitetura em camadas:

#### Schema (cars.schema.ts)
- **createCarSchema**: Esquema Zod para validação de entrada na criação de carros.
  - Campos obrigatórios: brand, model, version, year, price, fuel, transmission, mileage.
  - Campo opcional: imageUrl (deve ser uma URL válida).
- **CreateCarInput**: Tipo TypeScript inferido do schema.

#### Repository (cars.repository.ts)
- Classe `CarsRepository` que interage com o banco via Drizzle.
- Método `createCar`: Insere um novo carro na tabela e retorna o registro criado.
- Método `searchfilterCars`: Executa buscas com filtros e retorna os resultados ordenados por data de criação.
- Caso `imageUrl` não seja fornecido, o campo é gravado como string vazia no banco.

#### Service (cars.service.ts)
- Classe `CarsService` que contém a lógica de negócio.
- Método `createCar`: Chama o repository para criar o carro.
- Método `searchCars`: Chama o agente de busca por IA para interpretar a query de texto e executar a pesquisa.

#### Controller (cars.controller.ts)
- Classe `CarsController` que recebe as requisições HTTP.
- Método `createCar`: Valida o corpo da requisição com o schema Zod, chama o service e retorna a resposta.
- Método `searchCars`: Valida o corpo com `searchRequestSchema` e retorna os resultados de busca.

#### Routes (cars.routes.ts)
- Função `carsRoutes` que registra as rotas no Fastify.
- Rota `POST /cars`: Conecta à função `createCar` do controller.
- Rota `POST /cars/search`: Conecta à função `searchCars` do controller.
- Instancia as dependências (repository, aiSearchAgent, service, controller) dentro da função para isolamento.

### Busca por texto com IA

- `AiSearchAgentService` envia a mensagem do usuário para o modelo OpenAI configurado.
- O agente utiliza `tool_calls` para extrair filtros estruturados de busca.
- Filtros como `marca`, `nome` e `versao` são convertidos para busca parcial com `ilike`.
- A busca interna é feita pela combinação de filtros em `cars.brand`, `cars.model` e `cars.version`.
- Retorna os itens encontrados e uma resposta natural sobre a quantidade de resultados.

### Fluxo de Funcionamento
1. **Requisição**: Cliente faz POST para `/cars` com dados JSON ou POST para `/cars/search` com `{ search: string }`.
2. **Rota**: `cars.routes.ts` direciona para o controller correspondente.
3. **Controller**: Valida dados com Zod, chama o service adequado.
4. **Service**: Cria carro ou chama o agente de busca.
5. **Repository**: Insere no banco ou executa a consulta filtrada no banco.
6. **Resposta**: Controller retorna o resultado com status 200.

## Rotas Principais

- `GET /teste`
  - Retorna um objeto simples de status para checar o servidor.
- `POST /cars`
  - Cria um novo carro.
  - Body esperado: `brand`, `model`, `version`, `year`, `price`, `fuel`, `transmission`, `mileage`, `imageUrl?`.
- `POST /cars/search`
  - Busca carros usando uma query de texto livre.
  - Body esperado: `{ search: string }`.

## Inicialização e Execução

### Dependências
Instale as dependências com:
```bash
npm install
```

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz com:
```
PORT=3333
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
OPENAI_API_KEY=your_openai_key
OPENAI_MODEL=gpt-3.5-turbo
```

### Migrações
Execute as migrações para criar as tabelas:
```bash
npx drizzle-kit migrate
```

### Desenvolvimento
Execute o servidor em modo de desenvolvimento:
```bash
npm run dev
```
O servidor roda com TSX em watch mode, reiniciando automaticamente em mudanças.

### Build
Para produção, compile o TypeScript:
```bash
npm run build
```

## Considerações Finais

Este projeto demonstra uma arquitetura sólida para um backend Node.js, com foco em tipagem, validação e separação de responsabilidades. O módulo "cars" serve como exemplo e pode ser replicado para outros recursos (ex: usuários, vendas). Futuras expansões podem incluir autenticação, mais operações CRUD, integração com OpenAI para descrições automáticas de carros, e testes automatizados.</content>
<parameter name="filePath">c:\Users\Guile\OneDrive\Documentos\Estudos\Backend Node\projeto.md