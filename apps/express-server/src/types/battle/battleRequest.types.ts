import * as z from "zod";
import { Battle } from "../../model/battle.model";

//#region Objects
export const BattleQuery = z
	.object({
		userId: z.string().optional(),
		encounters: z.string().optional(),
		startFoughtAt: z.string().optional(),
		endFoughtAt: z.string().optional(),
		limit: z.string().optional(),
		outcome: z.enum(['profit','loss']).optional(),
		q: z
			.enum([
				"recent-fought",
				"longest",
				"shortest",
				"last-month",
			])
			.optional(),
		orderBy: z.enum(["asc", "desc"]).optional(),
	})
	.strict();

export const CreateBattleBody = Battle.omit({
	createdAt:true
});

export const GetBattleParam = z.object({ id: z.string() }).strict();

export const UpdateBattleBody = CreateBattleBody.partial().strict();
//#endregion

//#region TYPES
export type BattleQuery = z.infer<typeof BattleQuery>;

export type CreateBattleBody = z.infer<typeof CreateBattleBody>;
export type UpdateBattleBody = z.infer<typeof UpdateBattleBody>;

export type GetBattleParam = z.infer<typeof GetBattleParam>;
//#endregion
