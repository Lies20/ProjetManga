const pool = require("../Databases/index.js");
const cacheService = require("../Services/cacheService");

const postController = {
    getAll: async (req, res) => {
        try {
            const cachedPosts = await cacheService.get(cacheService.keys.ALL_POSTS);
            if (cachedPosts) {
                return res.json({ data: cachedPosts, fromCache: true });
            }

            const [rows] = await pool.query(
                "SELECT Post.*, User.pseudo FROM Post JOIN User ON Post.idUser = User.idUser"
            );
            
            const posts = rows.reverse();
            
            await cacheService.set(cacheService.keys.ALL_POSTS, posts, 15);
            
            res.json({ data: posts, fromCache: false });
        } catch (error) {
            handleError(res, error);
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            
            const cacheKey = cacheService.keys.POST_DETAILS(id);
            const cachedPost = await cacheService.get(cacheKey);
            if (cachedPost) {
                return res.json({ data: cachedPost, fromCache: true });
            }

            const [rows] = await pool.query(
                "SELECT Post.*, User.pseudo FROM Post JOIN User ON Post.idUser = User.idUser WHERE idPost = ?",
                [id]
            );
            
            await cacheService.set(cacheKey, rows, 30);
            
            res.json({ data: rows, fromCache: false });
        } catch (error) {
            handleError(res, error);
        }
    },

    create: async (req, res) => {
        try {
            const { title, description, idUser } = req.body;
            
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
            
            await cacheService.invalidateByType('posts');
            console.log("Cache posts invalidé après création");
            
            res.json({ message: "Publication créée", data: rows });
        } catch (error) {
            handleError(res, error);
        }
    },

    update: async (req, res) => {
        try {
            const { title, description, datePublication } = req.body;
            const { id } = req.params;
            
            const sql = "UPDATE Post SET title = ?, description = ?, datePublication = ? WHERE idPost = ?";
            const [rows] = await pool.query(sql, [title, description, new Date(), id]);
            
            await cacheService.invalidate(cacheService.keys.POST_DETAILS(id));
            await cacheService.invalidateByType('posts');
            console.log(`Cache invalidé après update du post ${id}`);
            
            res.json({ data: rows });
        } catch (error) {
            handleError(res, error);
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            
            await pool.query("DELETE FROM dreamanga_db.Commentary WHERE idPost = ?", [id]);
            const [rows] = await pool.query("DELETE FROM Post WHERE idPost = ?", [id]);
            
            await cacheService.invalidate(cacheService.keys.POST_DETAILS(id));
            await cacheService.invalidateByType('posts');
            console.log(`Cache invalidé après suppression du post ${id}`);
            
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