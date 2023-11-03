const pool = require("../Databases/index.js")
const commentaryController = {
    getAll: async  (req, res) => {
        try {
            const [rows] = await pool.query("select * from commentary")
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
            const [rows] = await pool.query("select * from commentary where iduser = ?",[id])
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
            const { subject, datePublication } = req.body
            const sql = "insert into user(subject, datePublication) value (?, ?,)"
            const [rows, fields] = await pool.query(sql, [subject, datePublication,])
            res.json({
                data: rows
            })
        } catch(error) {
            res.json({
                state : "error"
                })
        }
    },
    uptade : async  (req, res) => {
        try {
            const { pseudo, birthday, email, password } = req.body
            const {id} = req.params
            const sql = "update commmentary set pseudo = ?, birthday = ?, email = ?, password = ? where iduser = ? "
            const [rows, fields] = await pool.query(sql, [subject, birthday, email, password,id])
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
            const [rows, fields] = await pool.query("delete from commentary where iduser = ?",[id] )
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
module.exports = commentaryController