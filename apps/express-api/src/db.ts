import { MongoClient } from "mongodb";
import { env } from "@/common/utils/envConfig";

let MONGO_URI = "";

if (env.MONGO_LOCAL) {
  MONGO_URI = `${env.MONGO_URL}/${env.MONGO_DB_NAME}`;
} else {
  MONGO_URI =
    "mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}?authSource=admin";
}

export const client = new MongoClient(MONGO_URI);
export const db = client.db();
