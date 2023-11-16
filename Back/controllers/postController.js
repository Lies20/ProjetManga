const pool = require("../Databases/index.js");

const postController = {
    getAll: async (req, res) => {
        try {
            const [rows] = await pool.query(
                "SELECT Post.*, User.pseudo FROM Post JOIN User ON Post.idUser = User.idUser"
            );
            res.json({ data: rows });
        } catch (error) {
            handleError(res, error);
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await pool.query(
                "SELECT Post.*, User.pseudo FROM Post JOIN User ON Post.idUser = User.idUser WHERE idPost = ?",
                [id]
            );
            res.json({ data: rows });
        } catch (error) {
            handleError(res, error);
        }
    },

    create: async (req, res) => {
        try {
            const { title, description,idUser } = req.body;
            const [existingPosts] = await pool.query(
                "SELECT * FROM Post WHERE title = ? AND description = ?",
                [title, description]
              );
              if (existingPosts.length > 0) {
                return res.status(400).json({ message: "Ce post existe déja." });
              }
            const datePublication = new Date();
            const sql = "INSERT INTO Post (title, description, datePublication, idUser) VALUES (?, ?, ?, ?)";
            const [rows] = await pool.query(sql, [title, description, datePublication, idUser]);
            res.json({  message :"Publication créée", data: rows });
        } catch (error) {
            handleError(res, error);
        }
    },

    update: async (req, res) => {
        try {
            const { title, description, datePublication, idUser } = req.body;
            const { id } = req.params;
            const sql = "UPDATE Post SET title = ?, description = ?, datePublication = ?, idUser = ? WHERE idPost = ?";
            const [rows] = await pool.query(sql, [title, description, new Date(datePublication), idUser, id]);
            res.json({ data: rows });
        } catch (error) {
            handleError(res, error);
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await pool.query("DELETE FROM Post WHERE idPost = ?", [id]);
            res.json({ data: rows });
        } catch (error) {
            handleError(res, error);
        }
    }
};

function handleError(res, error) {
    console.error(error);
    res.json({ state: "error", message: error.message });
}


module.exports = postController;
