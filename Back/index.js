const express = require("express");
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
require('dotenv').config();

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Trop de requêtes, veuillez réessayer plus tard.",
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use(xss());

const corsOptions = {
  origin: [
    'https://projet-manga.vercel.app',
    'https://projetmanga-backend.onrender.com',
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); 

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/favicon.ico', (req, res) => res.status(204).end());

const userRouter = require("./Routes/user.router");
const postRouter = require("./Routes/post.router");
const commentaryController = require("./Routes/commentaryController.router");
const adminController = require("./Routes/admin.router");

app.use("/api/users", userRouter);
app.use("/api/post", postRouter);
app.use("/api/commentary", commentaryController);
app.use("/api/admin", adminController);

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
  console.log("🚀 Serveur démarré sur le port " + PORT);
});
