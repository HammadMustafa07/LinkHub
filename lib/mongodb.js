
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

let globalMongo = global._mongo;

if (!globalMongo) {
  globalMongo = global._mongo = {
    client: null,
    db: null,
  };
}

export async function connectDB() {
  // Return existing database connection
  if (globalMongo.db) {
    return globalMongo.db;
  }

  // Create MongoDB client if it doesn't exist
  if (!globalMongo.client) {
    globalMongo.client = new MongoClient(uri);
    await globalMongo.client.connect();

    console.log("✅ MongoDB Connected");
  }

  // Store database connection
  globalMongo.db = globalMongo.client.db();

  return globalMongo.db;
}

