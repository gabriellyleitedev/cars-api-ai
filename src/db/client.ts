import { drizzle } from 'drizzle-orm/node-postgres'; // node-postgres é o caminho que faz a ponte entre o vscode e o banco de dados
import { env } from '../config/env.js';
import * as schema from './schema/index.js';
import { Pool } from 'pg'; // mantém um "pool" (uma piscina) de conexões abertas e prontas para uso

export const pool = new Pool({
    connectionString: env.DATABASE_URL, 
})

export const db = drizzle({
    client: pool,
    schema, // schema diz ao drizzle quais tabelas existentes (ex: carros, usuários)
})   