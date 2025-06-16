const mongoConnection = require('./mongodb');

class LikesModel {
    constructor() {
        this.collectionName = 'likes';
        this.countersCollectionName = 'like_counters';
    }

    async getCollection() {
        const db = mongoConnection.getDb();
        return db.collection(this.collectionName);
    }

    async getCountersCollection() {
        const db = mongoConnection.getDb();
        return db.collection(this.countersCollectionName);
    }

    async initializeIndexes() {
        try {
            const likesCollection = await this.getCollection();
            const countersCollection = await this.getCountersCollection();

            await likesCollection.createIndex(
                { postId: 1, userId: 1 }, 
                { unique: true }
            );

            
            await likesCollection.createIndex({ postId: 1 });
            
            await likesCollection.createIndex({ userId: 1 });

            await countersCollection.createIndex({ postId: 1 }, { unique: true });

            console.log("✅ Index MongoDB pour les likes créés");
        } catch (error) {
            console.error("❌ Erreur création index likes:", error.message);
        }
    }

    async createLike(postId, userId) {
        try {
            const likesCollection = await this.getCollection();
            const countersCollection = await this.getCountersCollection();

            const likeDoc = {
                postId: postId.toString(),
                userId: userId.toString(),
                createdAt: new Date()
            };

            await likesCollection.insertOne(likeDoc);

            await countersCollection.updateOne(
                { postId: postId.toString() },
                { 
                    $inc: { count: 1 },
                    $set: { lastUpdated: new Date() }
                },
                { upsert: true }
            );

            return { success: true, message: 'Like ajouté avec succès' };
        } catch (error) {
            if (error.code === 11000) {
                return { success: false, message: 'Vous avez déjà liké ce post' };
            }
            throw error;
        }
    }

    async removeLike(postId, userId) {
        try {
            const likesCollection = await this.getCollection();
            const countersCollection = await this.getCountersCollection();

            const result = await likesCollection.deleteOne({
                postId: postId.toString(),
                userId: userId.toString()
            });

            if (result.deletedCount === 0) {
                return { success: false, message: 'Like non trouvé' };
            }

            await countersCollection.updateOne(
                { postId: postId.toString() },
                { 
                    $inc: { count: -1 },
                    $set: { lastUpdated: new Date() }
                }
            );

            return { success: true, message: 'Like retiré avec succès' };
        } catch (error) {
            throw error;
        }
    }

    async hasUserLiked(postId, userId) {
        try {
            const likesCollection = await this.getCollection();
            const like = await likesCollection.findOne({
                postId: postId.toString(),
                userId: userId.toString()
            });
            return !!like;
        } catch (error) {
            throw error;
        }
    }

    async getLikeCount(postId) {
        try {
            const countersCollection = await this.getCountersCollection();
            const counter = await countersCollection.findOne({
                postId: postId.toString()
            });
            return counter ? counter.count : 0;
        } catch (error) {
            throw error;
        }
    }

    async getPostLikes(postId, limit = 10, skip = 0) {
        try {
            const likesCollection = await this.getCollection();
            const likes = await likesCollection
                .find({ postId: postId.toString() })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .project({ userId: 1, createdAt: 1 })
                .toArray();
            
            return likes;
        } catch (error) {
            throw error;
        }
    }

    async getPostLikeStats(postId, userId = null) {
        try {
            const promises = [
                this.getLikeCount(postId)
            ];

            if (userId) {
                promises.push(this.hasUserLiked(postId, userId));
            }

            const results = await Promise.all(promises);
            
            return {
                count: results[0],
                hasLiked: userId ? results[1] : false
            };
        } catch (error) {
            throw error;
        }
    }

    async getUserLikedPosts(userId, limit = 20, skip = 0) {
        try {
            const likesCollection = await this.getCollection();
            const likes = await likesCollection
                .find({ userId: userId.toString() })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .project({ postId: 1, createdAt: 1 })
                .toArray();
            
            return likes.map(like => ({
                postId: like.postId,
                likedAt: like.createdAt
            }));
        } catch (error) {
            throw error;
        }
    }

    async getMostLikedPosts(limit = 10) {
        try {
            const countersCollection = await this.getCountersCollection();
            const topPosts = await countersCollection
                .find({})
                .sort({ count: -1 })
                .limit(limit)
                .toArray();
            
            return topPosts.map(post => ({
                postId: post.postId,
                likeCount: post.count,
                lastUpdated: post.lastUpdated
            }));
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new LikesModel();