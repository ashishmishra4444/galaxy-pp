import mongoose from "mongoose";

let connectionPromise = null;

export async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectionPromise) {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("MONGODB_URI is missing in environment variables.");
    }

    connectionPromise = mongoose.connect(mongoUri, {
      dbName: "galaxy_messages",
    });
  }

  await connectionPromise;
  return mongoose.connection;
}
