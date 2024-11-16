import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { validateRequest } from "@/common/utils/httpHandlers";
import { blogController } from "./blogController";
import { Schema } from "@mono/types";
import { GetBlogParam } from "./blogModel";

export const blogRegistry = new OpenAPIRegistry();
export const blogRouter: Router = express.Router();

blogRegistry.register("Blog", Schema.Blog);

blogRegistry.registerPath({
	method: "get",
	path: "/blogs",
	tags: ["Blog"],
	responses: createApiResponse(z.array(Schema.Blog), "Success"),
});

blogRouter.get("/", blogController.getBlog);

blogRegistry.registerPath({
	method: "get",
	path: "/users/{id}",
	tags: ["User"],
	request: { params: GetBlogParam },
	responses: createApiResponse(Schema.Blog, "Success"),
});

blogRouter.get(
	"/:id",
	validateRequest(z.object({ params: GetBlogParam })),
	blogController.getBlog,
);
