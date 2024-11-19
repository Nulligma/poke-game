import { Router } from "express";

export const battleAnalytics = Router();

//get table data of number of battle group by userId
battleAnalytics.get("/user-battle");

//get table data of number of battle group by each month
battleAnalytics.get("/monthly-battle");
