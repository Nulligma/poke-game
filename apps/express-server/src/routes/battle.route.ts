import { Router } from "express";
import * as BattleControllers from "../controller/battle.controller";
import { validateRequest } from "../middleware/validation";
import {
	CreateBattleBody,
	GetBattleParam,
	UpdateBattleBody,
} from "../types/battle/battleRequest.types";
import { BattleQuery } from "../types/battle/battleRequest.types";
import { battleAnalytics } from "./analytics/battle.analytics.route";

export const battleRouter = Router();

//get all battles
battleRouter.get(
	"/",
	validateRequest({ query: BattleQuery }),
	BattleControllers.findAll,
);

//get a post in battle by slug
battleRouter.get(
	"/:id",
	validateRequest({ params: GetBattleParam }),
	BattleControllers.getOne,
);

//create a new battle
battleRouter.post(
	"/",
	validateRequest({ body: CreateBattleBody }),
	BattleControllers.create,
);

//update an existing battle
battleRouter.patch(
	"/:id",
	validateRequest({ params: GetBattleParam, body: UpdateBattleBody }),
	BattleControllers.updateOne,
);

//delete a battle
battleRouter.delete(
	"/:id",
	validateRequest({ params: GetBattleParam }),
	BattleControllers.deleteOne,
);

//-------------battle ANALYTICS-----------------//
battleRouter.use("/analytics", battleAnalytics);
//to be used in a react dashboard
