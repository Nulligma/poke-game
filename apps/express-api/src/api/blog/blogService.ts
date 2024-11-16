import { StatusCodes } from "http-status-codes";
import type { Schema } from "@mono/types";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { Blogs } from "./blogModel";
import { logger } from "@/server";

export class BlogService {
	async findAll(): Promise<ServiceResponse<Schema.Blog[] | null>> {
		try {
			const blogs = await Blogs.find().toArray();
			if (!blogs || blogs.length === 0) {
				return ServiceResponse.failure(
					"No blogs found",
					null,
					StatusCodes.NOT_FOUND,
				);
			}
			return ServiceResponse.success<Schema.Blog[]>("blogs found", blogs);
		} catch (ex) {
			const errorMessage = `Error finding all blogs: $${(ex as Error).message}`;
			logger.error(errorMessage);
			return ServiceResponse.failure(
				"An error occurred while retrieving blogs.",
				null,
				StatusCodes.INTERNAL_SERVER_ERROR,
			);
		}
	}

	// Retrieves a single user by their ID
	async findById(slug: string): Promise<ServiceResponse<Schema.Blog | null>> {
		try {
			const blog = await Blogs.findOne({ slug });
			if (!blog) {
				return ServiceResponse.failure(
					"blog not found",
					null,
					StatusCodes.NOT_FOUND,
				);
			}
			return ServiceResponse.success<Schema.Blog>("blog found", blog);
		} catch (ex) {
			const errorMessage = `Error finding blog with slug ${slug}:, ${(ex as Error).message}`;
			logger.error(errorMessage);
			return ServiceResponse.failure(
				"An error occurred while finding blog.",
				null,
				StatusCodes.INTERNAL_SERVER_ERROR,
			);
		}
	}
}

export const blogService = new BlogService();
