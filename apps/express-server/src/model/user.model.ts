import type { WithId } from "mongodb";
import * as z from "zod";

export const UserModel = z.object({
	firstname: z.string(),
	lastname: z.string(),
	email: z.string(),
	profileImg: z.string(),
	accountBalance: z.number(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type User = z.infer<typeof UserModel>;
