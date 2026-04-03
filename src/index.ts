import express from "express";
import cors from "cors";
import Search from "./controllers/dictionary/Search";
import { route } from "./utils/route";
import Add from "./controllers/dictionary/Add";
import Delete from "./controllers/dictionary/Delete";

const app = express();
const PORT = 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// GET /dictionary — return all entries
app.get("/dictionary", route(Search));

// POST /dictionary — add new entries (skips duplicates by english word)
app.post("/dictionary", route(Add));

// DELETE /dictionary/:english — remove an entry by english word
app.delete("/dictionary/:english", route(Delete));

app.listen(PORT, () => {
  console.log(`learner-backend running on http://localhost:${PORT}`);
});
