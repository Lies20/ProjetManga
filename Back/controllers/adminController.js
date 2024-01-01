const pool = require("../Databases/index.js");
const jwt = require('jsonwebtoken');

const adminController = {
    delete: async (req, res) => {
        try {
            // Récupérer le token depuis l'en-tête de la requête
            const token = req.headers.authorization;
            console.log(token)
            const toktok = token.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Token missing' });
            }

            // Vérifier le token et obtenir l'ID de l'utilisateur
            jwt.verify(toktok, 'salutsalutsecretkey', async (err, decoded) => {
                if (err) {
                    console.log('Erreur de vérification du token :', err);
                    return res.status(401).json({ message: 'Invalid token' });
                }

                const userId = decoded.userId;

                // Récupérer l'utilisateur à partir de la base de données
                const [userRows] = await pool.query("SELECT * FROM User WHERE idUser = ?", [userId]);
                const user = userRows[0];

                // Vérifier le rôle de l'utilisateur
                console.log('salut', user.role)
                if (user.role === "admin") {
                    const { id } = req.params;

                    // Supprimer les commentaires liés au post
                    await pool.query("DELETE FROM DreamangaDataBase.Commentary WHERE idPost = ?", [id]);

                    // Supprimer le post
                    const [postRows] = await pool.query("DELETE FROM Post WHERE idPost = ?", [id]);

                    res.json({ data: postRows });
                } else {
                    res.status(403).json({ message: 'Permission denied. User is not an admin.' });
                }
            });

        } catch (error) {
            handleError(res, error);
        }
    }
};

function handleError(res, error) {
    console.error(error);
    res.json({ state: "error", message: error.message });
}

module.exports = adminController;
