const pool = require("../Databases/index.js");

const commentaryController = {
  getAll: async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM Commentary");
      res.json({
        data: rows,
      });
    } catch (error) {
      console.log(error);
      res.json({
        state: "error",
      });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query("SELECT * FROM Commentary WHERE idCommentary = ?", [id]);
      res.json({
        data: rows,
      });
    } catch (error) {
      console.log(error);
      res.json({
        state: "error",
      });
    }
  },

  create: async (req, res) => {
    try {
      const { subject, datePublication, idUser, idPost, role, isConnected } = req.body;
      const sql = "INSERT INTO Commentary (subject, datePublication, idUser, idPost, role, isConnected) VALUES (?, ?, ?, ?, ?, ?)";
      const [rows, fields] = await pool.query(sql, [subject, datePublication, idUser, idPost, role, isConnected]);
      res.json({
        data: rows,
      });
    } catch (error) {
      console.log(error);
      res.json({
        state: "error",
      });
    }
  },

  update: async (req, res) => {
    try {
      const { subject, datePublication, idUser, idPost, role, isConnected } = req.body;
      const { id } = req.params;
      const sql = "UPDATE Commentary SET subject = ?, datePublication = ?, idUser = ?, idPost = ?, role = ?, isConnected = ? WHERE idCommentary = ?";
      const [rows, fields] = await pool.query(sql, [subject, datePublication, idUser, idPost, role, isConnected, id]);
      res.json({
        data: rows,
      });
    } catch (error) {
      console.log(error);
      res.json({
        state: "error",
      });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await pool.query("DELETE FROM Commentary WHERE idCommentary = ?", [id]);
      res.json({
        data: rows,
      });
    } catch (error) {
      console.log(error);
      res.json({
        state: "error",
      });
    }
  },
};

module.exports = commentaryController;
