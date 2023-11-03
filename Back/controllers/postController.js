const pool = require("../Databases/index.js")

const postController = {
    getAll: async  (req, res) => {
        try {
            const [rows] = await pool.query("select * from post")
            res.json({
                data: rows
            })
        } catch(error) {
            res.json({
            state : "error"
            })
        }
    },

    getById: async  (req, res) => {
        try {
            const {id} = req.params
            const [rows] = await pool.query("select * from post where idPost = ?",[id])
            res.json({
                data: rows
            })
        } catch(error) {
            console.log(error)
            res.json({
                state : "error"
                })
        }
    },

    create: async  (req, res) => {
        try {
            const { title, description, datePublication, idUser } = req.body;
            const sql = "insert into post(title, description, datePublication, idUser) value (?, ?, ?, ?)"
            const [rows, fields] = await pool.query(sql, [title, description, datePublication, idUser])
            res.json({
                data: rows
            })
        } catch(error) {
            console.log(error)
            res.json({
                state : "error"
                })
        }
    },
    uptade : async  (req, res) => {
        try {
            const { title, description, datePublication, idUser } = req.body
            const {id} = req.params
            const sql = "update post set  title = ?, description = ?, datePublication = ? idUser = ? where iduser = ? "
            const [rows, fields] = await pool.query(sql, [title, description, datePublication, idUser,id])
            res.json({
                data: rows
            })
        } catch(error) {
            console.log(error)
            res.json({
                state : "error"
                })
        }
    },

    delete : async  (req, res) => {
        try {
            const {id} = req.params
            const [rows, fields] = await pool.query("delete from post where iduser = ?",[id] )
            res.json({
                data: rows
            })
        } catch(error) {
            console.log(error)
            res.json({
                state : "error"
                })
        }
    }
    
}
module.exports = postController