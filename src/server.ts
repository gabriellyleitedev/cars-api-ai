import { buildApp } from "./app.js";
import { env } from "./config/env.js";

async function boostrap() {
    const app = await buildApp()

    try {
        await app.listen({
            port: env.PORT,
            host: "0.0.0.0"
        })
    } catch (err) {
        app.log.error(err, "Falha ao iniciar") //mensagem de erro se o sevidor não iniciar
        process.exit(1); // Processo de erro
    }
}

void boostrap();