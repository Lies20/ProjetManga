const express = require("express")
const cors = require('cors')
const app = express()
require('dotenv').config()

app.use(express.urlencoded({ extended: false }))
app.use(cors({
  credentials: true,
  origin: ['https://projet-manga.vercel.app','https://projetmanga-backend.onrender.com'], 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}))
app.use(express.json())

app.get('/favicon.ico', (req, res) => res.status(204).end());

const PORT = process.env.PORT || 3006
const userRouter = require("./Routes/user.router")
const postRouter = require("./Routes/post.router")
const commentaryController = require("./Routes/commentaryController.router")
const adminController = require("./Routes/admin.router")

app.use("/api/users", userRouter)
app.use("/api/post", postRouter)
app.use("/api/commentary", commentaryController)
app.use("/api/admin", adminController)

app.listen(PORT, () => {
    console.log("le serveur est bien lancé")
})