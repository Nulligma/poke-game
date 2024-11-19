import { Router } from "express";
import { validateRequest } from "../middleware/validation";
import * as UserControllers from "../controller/user.controller";
import {
	CreateUserBody,
	GetUserParam,
	UpdateUserBody,
	UserQuery,
} from "../types/user/userRequest.types";

export const userRouter = Router();

//get list of userIDs filtered by query
userRouter.get(
	"/",
	validateRequest({ query: UserQuery }),
	UserControllers.findAll,
);

//get a single user by id
userRouter.get(
	"/:userID",
	validateRequest({ params: GetUserParam }),
	UserControllers.getOne,
);

//create a new user
userRouter.post(
	"/",
	validateRequest({ body: CreateUserBody }),
	UserControllers.create,
);

//update an existing user
userRouter.patch(
	"/:userID",
	validateRequest({ params: GetUserParam, body: UpdateUserBody }),
	UserControllers.updateOne,
);

//delete a user
userRouter.delete(
	"/:userID",
	validateRequest({ params: GetUserParam }),
	UserControllers.deleteOne,
);
