const express = require('express');
const cors = require('cors');
const app = express();
const port = 3006;

app.use(cors({
  credentials: true,
  origin: 'https://projet-manga-ph95.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}));

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use(express.static('public'));

app.listen(port, () => console.log(`Server running on port ${port}`));