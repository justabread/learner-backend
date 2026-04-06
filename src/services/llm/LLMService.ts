import OpenAI from "openai";
import type { Response } from "express";
import { readFileSync } from "fs";
import { resolve } from "path";

class LLMService {
  private client: OpenAI;
  private model: string;
  private systemPrompt: string;

  constructor() {
    this.client = new OpenAI({
      baseURL: process.env.LLM_BASE_URL ?? "http://localhost:11434/v1",
      apiKey: process.env.LLM_API_KEY ?? "ollama",
    });
    this.model = process.env.MODEL ?? "llama3.1:8b";
    this.systemPrompt = this.loadSystemPrompt();
  }

  private loadSystemPrompt(): string {
    const promptsPath = resolve(process.env.PROMPTS_PATH ?? "./prompts");
    const base = readFileSync(resolve(promptsPath, "base_teacher.md"), "utf-8");
    const freeform = readFileSync(
      resolve(promptsPath, "modes/freeform.md"),
      "utf-8",
    );
    return `${base}\n\n${freeform}`;
  }

  async streamChat(
    messages: { role: "user" | "assistant"; content: string }[],
    res: Response,
  ): Promise<void> {
    const stream = await this.client.chat.completions.create({
      model: this.model,
      stream: true,
      messages: [{ role: "system", content: this.systemPrompt }, ...messages],
    });

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    for await (const chunk of stream) {
      const token = chunk.choices[0]?.delta?.content ?? "";
      const done = chunk.choices[0]?.finish_reason === "stop";
      res.write(`data: ${JSON.stringify({ token, done })}\n\n`);
    }

    res.write("data: [DONE]\n\n");
    res.end();
  }
}

export default LLMService;
