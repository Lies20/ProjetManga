const mongoConnection = require('../Databases/mongodb');

class CacheService {
    constructor() {
        this.collection = null;
        this.keys = {
            ALL_POSTS: 'all_posts_with_users',
            POPULAR_POSTS: 'popular_posts_today',
            RECENT_POSTS: 'recent_posts_24h',
            USER_POSTS: (userId) => `user_${userId}_posts`,
            POST_DETAILS: (postId) => `post_${postId}_details`
        };
    }

    async init() {
        try {
            const db = mongoConnection.getDb();
            this.collection = db.collection('forum_cache');
            
            await this.collection.createIndex(
                { "expiresAt": 1 },
                { expireAfterSeconds: 0 }
            );
            
            console.log("🗄️ Service de cache initialisé");
        } catch (error) {
            console.error("❌ Erreur init cache:", error);
        }
    }

    async get(key) {
        try {
            if (!this.collection) await this.init();
            
            const cached = await this.collection.findOne({
                key,
                expiresAt: { $gt: new Date() }
            });
            
            if (cached) {
                console.log(`🎯 Cache HIT: ${key}`);
                return cached.data;
            }
            
            console.log(`❌ Cache MISS: ${key}`);
            return null;
        } catch (error) {
            console.error("Erreur lecture cache:", error);
            return null;
        }
    }

    async set(key, data, ttlMinutes = 30) {
        try {
            if (!this.collection) await this.init();
            
            const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000);
            
            await this.collection.replaceOne(
                { key },
                {
                    key,
                    data,
                    expiresAt,
                    createdAt: new Date(),
                    type: this.getTypeFromKey(key)
                },
                { upsert: true }
            );
            
            console.log(`💾 Cache SET: ${key} (expire dans ${ttlMinutes}min)`);
        } catch (error) {
            console.error("Erreur écriture cache:", error);
        }
    }

    async invalidate(key) {
        try {
            if (!this.collection) await this.init();
            
            const result = await this.collection.deleteOne({ key });
            if (result.deletedCount > 0) {
                console.log(`🗑️ Cache invalidé: ${key}`);
            }
        } catch (error) {
            console.error("Erreur invalidation cache:", error);
        }
    }

    async invalidateByType(type) {
        try {
            if (!this.collection) await this.init();
            
            const result = await this.collection.deleteMany({ type });
            console.log(`🗑️ ${result.deletedCount} entrées de cache supprimées (type: ${type})`);
        } catch (error) {
            console.error("Erreur invalidation par type:", error);
        }
    }

    getTypeFromKey(key) {
        if (key.includes('posts')) return 'posts';
        if (key.includes('user')) return 'users';
        if (key.includes('comment')) return 'comments';
        return 'general';
    }
}

const cacheService = new CacheService();
module.exports = cacheService;