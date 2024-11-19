import type { WithId } from "mongodb";
import type { User } from "../../model/user.model";

export type CreateUserResponse = WithId<
	Pick<User, "email" | "firstname" | "lastname">
>;
export type GetAllUserResponse = WithId<User>[];
