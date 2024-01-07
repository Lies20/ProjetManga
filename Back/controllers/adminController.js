const pool = require("../Databases/index.js");
const jwt = require('jsonwebtoken');

const adminController = {
    delete: async (req, res) => {
        try {
            const token = req.headers.authorization;
            const toktok = token.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Token missing' });
            }

            jwt.verify(toktok, 'salutsalutsecretkey', async (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: 'Invalid token' });
                }

                const userId = decoded.userId;
                const [userRows] = await pool.query("SELECT * FROM User WHERE idUser = ?", [userId]);
                const user = userRows[0];

                if (user.role === "admin") {
                    const { id } = req.params;
                    await pool.query("DELETE FROM dreamanga_db.Commentary WHERE idPost = ?", [id]);
                    const [postRows] = await pool.query("DELETE FROM Post WHERE idPost = ?", [id]);
                    res.json({ data: postRows });
                } else {
                    res.status(403).json({ message: 'Permission denied. User is not an admin.' });
                }
            });

        } catch (error) {
            handleError(res, error);
        }
    },
    deleteComment: async (req, res) => {
        try {
            const token = req.headers.authorization;
            const toktok = token.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Token missing' });
            }

            jwt.verify(toktok, 'salutsalutsecretkey', async (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: 'Invalid token' });
                }

                const userId = decoded.userId;
                const [userRows] = await pool.query("SELECT * FROM User WHERE idUser = ?", [userId]);
                const user = userRows[0];

                if (user.role === "admin") {
                    const { id } = req.params;
                    await pool.query("DELETE FROM dreamanga_db.Commentary WHERE idCommentary = ?", [id]);

                    res.json({ success:true });
                } else {
                    res.status(403).json({ message: 'Permission denied. User is not an admin.' });
                }
            });

        } catch (error) {
            handleError(res, error);
        }
    },
    infos: async (req, res) => {
        try {
            const token = req.headers.authorization;

            

            const toktok = token.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Token missing' });
            }

            jwt.verify(toktok, 'salutsalutsecretkey', async (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: 'Invalid token' });
                }

                const userId = decoded.userId;
                const [userRows] = await pool.query("SELECT * FROM User WHERE idUser = ?", [userId]);
                const user = userRows[0];

                if (user.role === "admin") {
                  const posts = await pool.query('SELECT * FROM dreamanga_db.Post')

                  const users = await pool.query('SELECT * FROM dreamanga_db.User')

                  const topUsersWithMostPosts = await pool.query(`
                    SELECT u.pseudo, COUNT(p.idPost) AS nombreDePosts
                    FROM dreamanga_db.User u
                    JOIN dreamanga_db.Post p ON u.idUser = p.idUser
                    GROUP BY u.idUser, u.pseudo
                    ORDER BY nombreDePosts DESC
                    LIMIT 5;
                   `);
                   console.log(posts, users, topUsersWithMostPosts)
                    res.status(200).json({
                        posts:posts[0],
                        users:users[0],
                        topUsers:topUsersWithMostPosts[0]
                    })
                } else {
                    res.status(403).json({ message: 'Permission denied. User is not an admin.' });
                }
            });

        } catch (error) {
            handleError(res, error);
        }
    },
};

function handleError(res, error) {
    console.error(error);
    res.json({ state: "error", message: error.message });
}

module.exports = adminController;
