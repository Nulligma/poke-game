import type { Collection } from "mongodb";
import type { Battle } from "../model/battle.model";
import type { User } from "../model/user.model";

export type DB_Collections = {
	battle: Collection<Battle> | undefined;
	user: Collection<User> | undefined;
};

export type CollectionKey = keyof DB_Collections;

export type DBC = DB_Collections[CollectionKey];
