import { ObjectId } from "bson";
import * as z from "zod";

export const Blog = z.object({
  slug: z.string(),
  userId: z.string(),
  userEmail: z.string(),
  image: z.string(),
  title: z.string(),
  body: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Blog = z.infer<typeof Blog>;

export const CreateBlogBody = Blog.pick({
  image: true,
  title: true,
  body: true,
  userId: true,
  userEmail: true,
});
export type CreateBlogBody = z.infer<typeof CreateBlogBody>;


export const Todo = z.object({
  title: z.string().min(5).max(20),
  body: z.string().max(200),
  dueDate: z.string().pipe(z.coerce.date()),
  createdAt: z.string().pipe(z.coerce.date()),
  done: z.boolean()
});
export type Todo = z.infer<typeof Todo>;
export type TodoWithID = Todo & {_id:ObjectId}

export const mongoObject = {
  id: z
      .string()
      .min(1)
      .refine(
          (val: string) => {
              try {
                  return new ObjectId(val);
              } catch (error) {
                  return false;
              }
          },
          {
              message: "Invalid ObjectId",
          }
      ),
};

export const TodoIDParam = z.object({ id: mongoObject.id });
export type TodoIDParam = z.infer<typeof TodoIDParam>;

export const UpdateTodoBody = Todo.partial().strict();
export type UpdateTodoBody = z.infer<typeof UpdateTodoBody>;

