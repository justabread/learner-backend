import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import Search from "./controllers/dictionary/Search.js";
import Add from "./controllers/dictionary/Add.js";
import Delete from "./controllers/dictionary/Delete.js";
import Chat from "./controllers/chat/Chat.js";
import GoogleRedirect from "./controllers/auth/GoogleRedirect.js";
import GoogleCallback from "./controllers/auth/GoogleCallback.js";
import Logout from "./controllers/auth/Logout.js";
import GuestLogin from "./controllers/auth/GuestLogin.js";
import { route } from "./utils/route.js";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// GET
app.get("/auth/google", route(GoogleRedirect));
app.get("/auth/google/callback", route(GoogleCallback));
app.get("/auth/guest", route(GuestLogin));
app.get("/dictionary", route(Search));

// POST
app.post("/chat", route(Chat));
app.post("/dictionary", route(Add));

// DELETE
app.delete("/dictionary/:english", route(Delete));
app.delete("/auth/logout", route(Logout));

app.listen(PORT, () => {
  console.log(`learner-backend running on port ${PORT}`);
});