import { db } from "@/db";
import type { Schema } from "@mono/types";
import type { WithId } from "mongodb";
import { z } from "zod";

export type BlogWithId = WithId<Schema.Blog>;
export const Blogs = db.collection<Schema.Blog>("blogs");

export const GetBlogParam = z.object({ slug: z.string() }).strict();
