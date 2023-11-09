const pool = require("../Databases/index.js")
const userController = {
    getAll: async  (req, res) => {
        try {
            const [rows] = await pool.query("select * from user")
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

    getById: async  (req, res) => {
        try {
            const {id} = req.params
            const [rows] = await pool.query("select * from user where iduser = ?",[id])
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
            const { pseudo, birthday, email, password } = req.body
            const sql = "insert into user(pseudo, birthday, email, password) value (?, ?, ?, ?)"
            const [rows, fields] = await pool.query(sql, [pseudo, birthday, email, password])
            res.json({
                data: rows
            })
        } catch(error) {
            res.json({
                state : "error"
                })
        }
    },
    update : async  (req, res) => {
        try {
            const { pseudo, birthday, email, password } = req.body
            const {id} = req.params
            const sql = "update user set pseudo = ?, birthday = ?, email = ?, password = ? where iduser = ? "
            const [rows, fields] = await pool.query(sql, [pseudo, birthday, email, password,id])
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
            const [rows, fields] = await pool.query("delete from user where iduser = ?",[id] )
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
module.exports = userController