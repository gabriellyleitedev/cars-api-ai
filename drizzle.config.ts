import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  out: './src/db/migrations', // pasta onde as migrações serão criadas
  schema: './src/db/schema/index.ts',
  dialect: 'postgresql',
  dbCredentials: { // credenciais do banco 
    url: process.env.DATABASE_URL!,
  },
});