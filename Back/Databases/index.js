const mysql = require("mysql2");
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

pool.getConnection((err, connection) => {
      if (err) {
        console.error("Erreur de connexion à la base de données:", err.message);
      } else {
        console.log("Connecté à la base de données MySQL");
    
        connection.release(); 
      }
    });

// Utilisez la méthode promise() pour obtenir une version compatible promesse
const promisePool = pool.promise();

// Exportez le pool de promesses
module.exports = promisePool;


