const likesModel = require('../Databases/likesModels');

class LikesService {
    
    async toggleLike(postId, userId) {
        try {
            const hasLiked = await likesModel.hasUserLiked(postId, userId);
            
            let result;
            if (hasLiked) {
                result = await likesModel.removeLike(postId, userId);
            } else {
                result = await likesModel.createLike(postId, userId);
            }
            
            if (result.success) {
                const stats = await likesModel.getPostLikeStats(postId, userId);
                return {
                    success: true,
                    action: hasLiked ? 'unliked' : 'liked',
                    stats
                };
            }
            return result;
        } catch (error) {
            throw new Error('Erreur lors du traitement du like');
        }
    }

    async getPostStats(postId, userId = null) {
        try {
            return await likesModel.getPostLikeStats(postId, userId);
        } catch (error) {
            throw new Error('Erreur lors de la récupération des stats');
        }
    }

    async getMultiplePostsStats(postIds, userId = null) {
        try {
            const promises = postIds.map(postId => 
                likesModel.getPostLikeStats(postId, userId)
            );
            const results = await Promise.all(promises);
            
            const statsMap = {};
            postIds.forEach((postId, index) => {
                statsMap[postId] = results[index];
            });
            
            return statsMap;
        } catch (error) {
            throw new Error('Erreur lors de la récupération des stats multiples');
        }
    }

    async getPostLikes(postId, limit = 10, skip = 0) {
        try {
            return await likesModel.getPostLikes(postId, limit, skip);
        } catch (error) {
            throw new Error('Erreur lors de la récupération des likes');
        }
    }

    async getUserLikedPosts(userId, limit = 20, skip = 0) {
        try {
            return await likesModel.getUserLikedPosts(userId, limit, skip);
        } catch (error) {
            throw new Error('Erreur lors de la récupération des posts likés');
        }
    }

    async getMostLikedPosts(limit = 10) {
        try {
            return await likesModel.getMostLikedPosts(limit);
        } catch (error) {
            throw new Error('Erreur lors de la récupération des posts populaires');
        }
    }
}

module.exports = new LikesService();