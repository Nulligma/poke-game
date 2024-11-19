import * as z from "zod";
import { UserModel, type User } from "../../model/user.model";

//#region Objects
export const UserQuery = z
	.object({
		email: z.string().optional(),
		firstname: z.string().optional(),
		lastname: z.string().optional(),
		startCreatedDate: z.string().optional(),
		endCreatedDate: z.string().optional(),
		q: z.enum(["rich", "poor"]).optional(),
		orderBy: z.enum(["asc", "desc"]).optional(),
		limit: z.string().optional(),
	})
	.strict();

export const CreateUserBody = UserModel.pick({
	firstname: true,
	lastname: true,
	email: true,
	profileImg: true,
	accountBalance: true,
});

export const GetUserParam = z.object({ userID: z.string() }).strict();

export const UpdateUserBody = CreateUserBody.partial().strict();
//#endregion

//#region TYPES
export type UserQuery = z.infer<typeof UserQuery>;

export type CreateUserBody = z.infer<typeof CreateUserBody>;
export type UpdateUserBody = z.infer<typeof UpdateUserBody>;

export type GetUserParam = z.infer<typeof GetUserParam>;
//#endregion
