import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import Search from './controllers/dictionary/Search.js'
import Add from './controllers/dictionary/Add.js'
import Delete from './controllers/dictionary/Delete.js'
import Chat from './controllers/chat/Chat.js'
import { route } from './utils/route.js'

const app = express()
const PORT = process.env.PORT ?? 3001

app.use(cors({ origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173' }))
app.use(express.json())

// GET
app.get('/dictionary', route(Search))

// POST
app.post('/chat', route(Chat))
app.post('/dictionary', route(Add))

// DELETE
app.delete('/dictionary/:english', route(Delete))

app.listen(PORT, () => {
  console.log(`learner-backend running on port ${PORT}`)
})