import { Request, Response } from 'express'
import { OpenAI, } from 'openai'
import dotenv from 'dotenv'

dotenv.config()

const model = process.env.OPENAI_MODEL
const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY
})

export const chatGPT = async (req: Request, res: Response) => {
    try {
        const { ingredients } = req.body

        if (!ingredients || ingredients.length == 0) {
            res.status(400).json({ message: 'Nenhum ingrediente informado' })
            return
        }

        let prompt = createPrompt(ingredients)

        const stream = await openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: (model) as string,
            temperature: 0.7,
            max_tokens: 2048,
            stream: true
        });

        for await (const part of stream) {
            res.write(part.choices[0]?.delta.content || "");
        }
        // here express sends the closing/done/end signal for the stream consumer
        res.end();
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const createPrompt = (ingredientes: string): string => {
    let prompt = `Crie uma receita fácil com os seguintes ingredientes: ${ingredientes}`

    return prompt
}