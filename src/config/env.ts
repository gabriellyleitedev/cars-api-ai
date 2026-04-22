import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
    PORT: z.coerce.number().int().min(1).default(3333),
    NODE_ENV: z.enum(["development", "production", "test"]),
    DATABASE_URL: z.string().min(1),
    OPENAI_API_KEY: z.string().min(1),
    OPENAI_MODEL: z.string().min(1),
});

const parseEnv = envSchema.safeParse(process.env);

if (!parseEnv.success) {
    throw new Error("FALTANDO VARIÁVEIS DE AMBIENTE");
}

export const env = parseEnv.data;