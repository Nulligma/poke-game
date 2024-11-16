import { mongoObject, Todo } from "../schema/database";
import * as z from 'zod';

export const Message = z.object({message:z.string()})
export type Message = z.infer<typeof Message>

export const TodoObj = Todo.extend({_id:mongoObject.id });
export type TodoObj = z.infer<typeof TodoObj>;

export const TodoObjs = z.array(TodoObj);
export type TodoObjs = z.infer<typeof TodoObjs>;