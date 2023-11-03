const express = require("express")
const cors = require('cors')

const app = express()

require('dotenv').config()

app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(express.json())


const PORT = process.env.PORT || 3002

const userRouter = require("./Routes/user.router")
const postRouter = require("./Routes/post.router")
const commentaryController = require("./Routes/commentaryController.router")

app.use("/api/v1/user", userRouter)
app.use("/api/post", postRouter)
app.use("/api/commentary", commentaryController)

app.listen(PORT, () => {
    console.log("le serveur est bien lancée")
})