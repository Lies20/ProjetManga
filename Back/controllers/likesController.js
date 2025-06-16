const likesService = require("../Services/likesService");
const cacheService = require("../Services/cacheService");

const likesController = {
    toggle: async (req, res) => {
        try {
            const { postId } = req.params;
            const { userId } = req.body;
            
            if (!postId || !userId) {
                return res.status(400).json({ 
                    state: "error", 
                    message: "postId et userId requis" 
                });
            }
            
            const result = await likesService.toggleLike(postId, userId);
            
            await cacheService.invalidateByType('posts');
            console.log(`Cache invalidé après ${result.action} du post ${postId}`);
            
            res.json({ 
                state: "success",
                data: result,
                fromCache: false
            });
        } catch (error) {
            handleError(res, error);
        }
    },

    getStats: async (req, res) => {
        try {
            const { postId } = req.params;
            const { userId } = req.query;
            
            const cacheKey = `likes_stats_${postId}_${userId || 'anonymous'}`;
            const cachedStats = await cacheService.get(cacheKey);
            if (cachedStats) {
                return res.json({ data: cachedStats, fromCache: true });
            }
            
            const stats = await likesService.getPostStats(postId, userId);
            
            await cacheService.set(cacheKey, stats, 5);
            
            res.json({ data: stats, fromCache: false });
        } catch (error) {
            handleError(res, error);
        }
    },

    getMultipleStats: async (req, res) => {
        try {
            const { postIds } = req.body;
            const { userId } = req.query;
            
            if (!Array.isArray(postIds)) {
                return res.status(400).json({ 
                    state: "error", 
                    message: "postIds doit être un tableau" 
                });
            }
            
            const stats = await likesService.getMultiplePostsStats(postIds, userId);
            
            res.json({ data: stats, fromCache: false });
        } catch (error) {
            handleError(res, error);
        }
    },

    getPostLikes: async (req, res) => {
        try {
            const { postId } = req.params;
            const limit = parseInt(req.query.limit) || 10;
            const skip = parseInt(req.query.skip) || 0;
            
            const cacheKey = `post_likes_${postId}_${limit}_${skip}`;
            const cachedLikes = await cacheService.get(cacheKey);
            if (cachedLikes) {
                return res.json({ data: cachedLikes, fromCache: true });
            }
            
            const likes = await likesService.getPostLikes(postId, limit, skip);
            
            await cacheService.set(cacheKey, likes, 10);
            
            res.json({ data: likes, fromCache: false });
        } catch (error) {
            handleError(res, error);
        }
    },

    getUserLikedPosts: async (req, res) => {
        try {
            const { userId } = req.params;
            const limit = parseInt(req.query.limit) || 20;
            const skip = parseInt(req.query.skip) || 0;
            
            const cacheKey = `user_liked_posts_${userId}_${limit}_${skip}`;
            const cachedPosts = await cacheService.get(cacheKey);
            if (cachedPosts) {
                return res.json({ data: cachedPosts, fromCache: true });
            }
            
            const likedPosts = await likesService.getUserLikedPosts(userId, limit, skip);
            
            await cacheService.set(cacheKey, likedPosts, 15);
            
            res.json({ data: likedPosts, fromCache: false });
        } catch (error) {
            handleError(res, error);
        }
    },

    getMostLiked: async (req, res) => {
        try {
            const limit = parseInt(req.query.limit) || 10;
            
            const cacheKey = `most_liked_posts_${limit}`;
            const cachedPosts = await cacheService.get(cacheKey);
            if (cachedPosts) {
                return res.json({ data: cachedPosts, fromCache: true });
            }
            
            const mostLiked = await likesService.getMostLikedPosts(limit);
            
            await cacheService.set(cacheKey, mostLiked, 30);
            
            res.json({ data: mostLiked, fromCache: false });
        } catch (error) {
            handleError(res, error);
        }
    }
};

function handleError(res, error) {
    console.error(error);
    res.json({ state: "error", message: error.message });
}

module.exports = likesController;