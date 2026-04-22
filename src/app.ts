import fastify from "fastify";
import cors from "@fastify/cors";
import { carsRoutes } from "./modules/cars/cars.routes.js";

// async funciona como uma promise, async transforma a função buildApp em uma "fábrica de promessas"
export async function buildApp() {
    const app = fastify({
        logger: true, // Avisa quando alguém acessa ou se deu erro
    });
    
await app.register(cors, { origin: true}); // Esse app é essencial para que o site tenha permissão de conversar com o servidor


app.get("/teste", async () => ({
    status: true,
    message: "Teste de funcionamento"
}));


app.register(carsRoutes);

return app;

}