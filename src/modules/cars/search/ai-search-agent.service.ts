import { env } from "../../../config/env.js";
import { OpenAI } from "openai";
import { CarsRepository } from "../cars.repository.js";
import { z } from "zod";

const TOOL_NAME = "buscar_carros"

const toolArgsSchema = z.object({
    marca: z.string().trim().min(1).optional(),
    nome: z.string().trim().min(1).optional(),
    versao: z.string().trim().min(1).max(1).optional(),
})

const BUSCAR_CARROS_TOOL = {
    type: "function" as const,
}
export class AiSearchAgentService {
    private readonly client = new OpenAI ({
        apiKey: env.OPENAI_API_KEY
    })

    constructor(
        private readonly repository: CarsRepository
    ) {}

    async run(userMessage: string){
        console.log("MENSAGEM: ", userMessage)

        const completion = await this.client.chat.completions.create({
            model: env.OPENAI_MODEL as string,
            temperature: 0,
            messages: [
                {
                    role: "system",
                    content: "Voce eh um especialista em carros"
                },
                {
                  role: "user",
                  content: userMessage  
                }
            ],
            t
        })
    }
}
