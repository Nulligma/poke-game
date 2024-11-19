import type { WithId } from "mongodb";
import * as z from "zod";

//#region Objects
export const Encounter = z.object({
	pokemonId: z.number(),
	attempts: z.number(),
	result: z.enum(["caught", "escaped"]),
});
//#endregion

//#region TYPES
export type Encounter = z.infer<typeof Encounter>;
//#endregion
