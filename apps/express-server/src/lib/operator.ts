import type { Filter, FindOptions } from "mongodb";
import type { BattleQuery } from "../types/battle/battleRequest.types";
import type { Battle } from "../model/battle.model";
import type { UserQuery } from "../types/user/userRequest.types";
import type { User } from "../model/user.model";

export function convertBattleQueryToFindParams(
	query: BattleQuery,
): [Filter<Battle>, FindOptions] {
	const getQuery: Filter<Battle> = {};
	const getOption: FindOptions = {};

	if (query.userId) getQuery.userId = query.userId;

	if (query.limit) getOption.limit = Number.parseInt(query.limit);

	if (query.startFoughtAt && query.endFoughtAt)
		getQuery.createdAt = {
			$gte: new Date(query.startFoughtAt),
			$lte: new Date(query.endFoughtAt),
		};

	const date = new Date();
	if (query.q) {
		switch (query.q) {
			case "last-month":
				date.setDate(date.getDate() - 30);
				getQuery.updatedAt = {
					$gte: date,
					$lte: new Date(),
				};
				break;
		}
	}

	getOption.sort = { updatedAt: -1 };

	return [getQuery, getOption];
}

export function convertUserQueryToFindParams(
	query: UserQuery,
): [Filter<User>, FindOptions] {
	const getQuery: Filter<User> = {};
	const getOption: FindOptions = {};

	if (query.email) getQuery.email = query.email;

	if (query.firstname) getQuery.firstname = { $regex: query.firstname };
	if (query.lastname) getQuery.lastname = { $regex: query.lastname };

	if (query.limit) getOption.limit = Number.parseInt(query.limit);

	if (query.startCreatedDate && query.endCreatedDate)
		getQuery.createdAt = {
			$gte: new Date(query.startCreatedDate),
			$lte: new Date(query.endCreatedDate),
		};

	const date = new Date();
	if (query.q) {
		switch (query.q) {
			case "rich":
				getOption.sort = { accountBalance: 1 };
				break;

			case "poor":
				getOption.sort = { accountBalance: -1 };
				break;
		}
	}

	// getOption.sort = { updatedAt: -1 };

	return [getQuery, getOption];
}
