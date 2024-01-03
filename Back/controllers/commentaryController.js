const pool = require("../Databases/index.js");

const commentaryController = {
  getAll: async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM Commentary");
      res.json({
        data: rows,
      });
    } catch (error) {
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
      res.json({
        state: "error",
      });
    }
  },

  create: async (req, res) => {
    try {
      const { subject, idUser, idPost } = req.body;
      const sql = "INSERT INTO Commentary (subject, datePublication, idUser, idPost) VALUES (?, NOW(), ?, ?)";
      const [rows, fields] = await pool.query(sql, [subject, idUser, idPost]);
      res.json({
        data: rows,
      });
    } catch (error) {
      res.json({
        state: "error",
      });
    }
  },

  update: async (req, res) => {
    try {
      const { subject, datePublication, idUser, idPost, role, isConnected } = req.body;
      const { id } = req.params;
  
      const sql = "UPDATE Commentary SET subject = ?,  idUser = ?, idPost = ? WHERE idCommentary = ?";
      const [rows, fields] = await pool.query(sql, [subject, idUser, idPost, id]);    

      res.json({
        data: rows,
      });
    } catch (error) {
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
      res.json({
        state: "error",
      });
    }
  },

  getCommentsByPostId: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await pool.query("SELECT Commentary.*, User.* FROM Commentary JOIN User ON User.idUser = Commentary.idUser  WHERE idPost = ? ORDER BY commentary.datePublication", [id]);
      res.json({
        data: rows,
      });
    } catch (error) {
      res.json({
        state: "error",
      });
    }
  },
};

module.exports = commentaryController;
