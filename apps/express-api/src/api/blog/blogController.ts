import type { Request, RequestHandler, Response } from "express";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { blogService } from "./blogService";

class BlogController {
	public getBlogs: RequestHandler = async (_req: Request, res: Response) => {
		const serviceResponse = await blogService.findAll();
		return handleServiceResponse(serviceResponse, res);
	};

	public getBlog: RequestHandler = async (req: Request, res: Response) => {
		const slug = req.params.slug as string;
		const serviceResponse = await blogService.findById(slug);
		return handleServiceResponse(serviceResponse, res);
	};
}

export const blogController = new BlogController();
