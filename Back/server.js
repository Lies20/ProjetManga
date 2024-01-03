const express = require('express');
const multer = require('multer');
const cors = require('cors')

const app = express();
const port = 3006;

app.use(cors({
  credentials: true,
  origin: '*', // Remplace cela par le domaine de ton frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://projet-manga-ph95.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.listen(port, () => console.log(`Server running on port ${port}`));
