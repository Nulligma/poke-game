import type { WithId } from "mongodb";
import * as z from "zod";
import { Encounter } from "./encounter.model";

//#region Objects
export const Battle = z.object({
	userId: z.string(),
	encounters: z.array(Encounter),
	goldSpent: z.number(),
	goldEarned: z.number(),
	createdAt: z.date(),
});
//#endregion

//#region TYPES
export type Battle = z.infer<typeof Battle>;
//#endregion
