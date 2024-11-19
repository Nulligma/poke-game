import type { WithId } from "mongodb";
import type { Battle } from "../../model/battle.model";

export type CreateBattleResponse = WithId<Pick<Battle, "userId">>;
export type GetAllBattleResponse = WithId<Battle>[];
