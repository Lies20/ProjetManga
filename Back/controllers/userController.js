const pool = require("../Databases/index.js");
const bcrypt = require('bcrypt');
const jwtService = require('./jwtController.js');

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

    getUserById: async  (req, res) => {
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

    getUserByEmail: async  (req, res) => {
        try {
            const {email} = req.params
            const [rows] = await pool.query("select * from user where email = ?",[email])
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

 create: async (req, res) => {
    try {
        const { pseudo, birthday, email, password } = req.body;

        const [existingUser] = await pool.query(
            "SELECT * FROM User WHERE pseudo = ? OR email = ?",
            [pseudo, email]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({ message: "Le pseudo ou l'email existe déjà." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = "INSERT INTO User (pseudo, birthday, email, password) VALUES (?, ?, ?, ?)";
        const [rows] = await pool.query(sql, [pseudo, birthday, email, hashedPassword]);
        res.json({ message: "Compte créé avec succès.", data: rows });
    } catch (error) {
        handleError(res, error);
    }
},

login: async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Données reçues dans la route de connexion :', req.body);

        const [user] = await pool.query("SELECT * FROM User WHERE email = ?", [email]);

        if (user.length === 0) {
            return res.status(401).json({ message: "Utilisateur non trouvé." });
        }

        // const isPasswordValid = await bcrypt.compare(password, user[0].password);
        const isPasswordValid = await bcrypt.compare(password.trim(), user[0].password);

        console.log('Mot de passe stocké dans la base de données :', user[0].password);
        console.log('Mot de passe fourni dans la requête :', password);
        console.log('La comparaison de mot de passe est-elle valide ?', isPasswordValid);
        console.log('Longueur du mot de passe stocké :', user[0].password.length);
        console.log('Longueur du mot de passe fourni :', password.length);
        console.log('Mot de passe fourni :', password);
        console.log('Données reçues dans la route de connexion :', req.body);
        console.log('Mot de passe stocké dans la base de données :', user[0].password);
        console.log('Mot de passe fourni dans la requête :', password);



        if (!isPasswordValid) {
            return res.status(401).json({ message: "Mot de passe incorrect." });
        }

        const token = jwtService.generateToken(user[0].idUser);

        res.json({
            message: "Connexion réussie.",
            token,
            userData: {
                userId: user[0].idUser,
                pseudo: user[0].pseudo,
                email: user[0].email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Échec de la connexion.", error: error.message, stack: error.stack });
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