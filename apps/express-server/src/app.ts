import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { Database } from "./db/db";
import { errorResponse, notfound } from "./middleware/errorResponse";
import { battleRouter } from "./routes/battle.route";
import { validateDB } from "./middleware/validation";
import { userRouter } from "./routes/user.route";

dotenv.config();

export async function createApp() {
	const app = express();

	app.use(morgan("dev"));
	app.use(cors({ origin: process.env.FRONTEND_URL,credentials:true, }))
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());

	await Database.Instance.init();

	app.use("/battle", validateDB("battle"), battleRouter);
	app.use("/user", validateDB("user"), userRouter);

	app.get("/auth/me",(req,res)=>{res.json({user:"1234"})});

	app.use(notfound);
	app.use(errorResponse);

	return app;
}
