import Controller from "../Controller.js";
import LLMService from "../../services/llm/LLMService.js";

class Chat extends Controller {
  run(): void {
    const messages: { role: "user" | "assistant"; content: string }[] =
      this.request.body;

    if (!Array.isArray(messages)) {
      this.response
        .status(400)
        .json({ error: "Expected an array of messages" });
      return;
    }

    const llm = new LLMService();
    llm.streamChat(messages, this.response).catch(() => {
      if (!this.response.headersSent) {
        this.response.status(500).json({ error: "LLM stream failed" });
      }
    });
  }
}

export default Chat;
