const { MongoClient } = require('mongodb');
require('dotenv').config();

class MongoDBConnection {
    constructor() {
        this.client = null;
        this.db = null;
    }

    async connect() {
        try {
            this.client = new MongoClient(process.env.MONGODB_URI);
            await this.client.connect();
            this.db = this.client.db();
            console.log("✅ Connecté à MongoDB pour le cache");
            return this.db;
        } catch (error) {
            console.error("❌ Erreur connexion MongoDB:", error.message);
            throw error;
        }
    }

    getDb() {
        if (!this.db) {
            throw new Error("MongoDB non connecté. Appelez connect() d'abord.");
        }
        return this.db;
    }

    async close() {
        if (this.client) {
            await this.client.close();
            console.log("🔌 Connexion MongoDB fermée");
        }
    }
}

const mongoConnection = new MongoDBConnection();

module.exports = mongoConnection;