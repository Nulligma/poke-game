import type { Response } from "express";
import type { Db } from "mongodb";
import { MongoClient } from "mongodb";
import type { Battle } from "../model/battle.model";
import type { CollectionKey, DBC, DB_Collections } from "../types/database";
import type { User } from "../model/user.model";

export class Database {
	private client: MongoClient | undefined;
	private mongoDB: Db | undefined;
	private collections: DB_Collections;

	private static _instance: Database;

	public isConnected: boolean;

	constructor() {
		this.collections = {
			battle: undefined,
			user: undefined,
		};

		this.isConnected = false;
	}

	public static get Instance() {
		if (!Database._instance) Database._instance = new Database();

		return Database._instance;
	}

	async init() {
		if (Database._instance.isConnected) return;

		try {
			await Database._instance.connectToMongoDB(
				process.env.MONGO_URL || "",
				process.env.MONGO_DB_NAME || "",
			);

			await Database._instance.generateCollections();

			Database.Instance.isConnected = true;
		} catch (error) {
			console.error(error);
		}
	}

	async disconnect() {
		if (this.client) {
			try {
				await this.client.close();
				console.log("Mongo client closed");
			} catch (error) {
				console.error(error);
			}
		}
	}

	async connectToMongoDB(mongoURL: string, dbName: string) {
		this.client = new MongoClient(mongoURL, {
			connectTimeoutMS: 5000,
			serverSelectionTimeoutMS: 5000,
		});

		await this.client.connect();
		console.info("Connected to MongoDB");

		this.mongoDB = this.client.db(dbName);

		console.info(`connected to ${dbName}`);
	}

	getMongoOrRefuse(res: Response): Db | undefined {
		if (!this.mongoDB) {
			res.status(500);
			console.error(
				"No connection to mongoDB so cannot perform this operation",
			);
			res.send("Critical error in server please contact support");
		}

		return this.mongoDB;
	}

	async getCollection(collectionsName: CollectionKey): Promise<DBC> {
		if (!this.mongoDB) {
			console.error(
				"No connection to mongoDB so cannot perform this operation",
			);
			throw new Error("Critical error in server please contact support");
		}

		try {
			await this.mongoDB.command({ ping: 1 });
		} catch (error) {
			console.error("Cannot ping the the db");
			throw new Error("Critical error in server please contact support");
		}

		const collection = this.collections[collectionsName];

		if (!collection) {
			console.error(
				`${collectionsName} does not exist and creation of collection is not allowed`,
			);
			throw new Error("Critical error in server please contact support");
		}

		return collection;
	}

	async generateCollections() {
		if (!this.mongoDB) return;

		const hasBattle = await this.mongoDB
			.listCollections({ name: "battle" })
			.next();

		const hasUser = await this.mongoDB.listCollections({ name: "user" }).next();

		if (hasBattle)
			this.collections.battle = this.mongoDB.collection<Battle>("battle", {});

		if (hasUser)
			this.collections.user = this.mongoDB.collection<User>("user", {});
	}
}
