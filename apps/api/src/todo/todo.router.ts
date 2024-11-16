import { Router } from "express";
import * as todoController from './todo.controller';
import { validator } from "../middleware/validator";
import { Todo, TodoIDParam, UpdateTodoBody } from "@mono/types/src/schema/database";
import * as z from 'zod';

export const todoRouter = Router();

todoRouter.get('/', todoController.getTodoList);

todoRouter.get('/:id', validator(z.object({ params: TodoIDParam })), todoController.getATodo);

todoRouter.post('/', validator(z.object({ body: Todo })), todoController.addTodo);

todoRouter.patch('/:id', validator(z.object({ params: TodoIDParam, body: UpdateTodoBody })), todoController.updateTodo);

todoRouter.delete('/:id', validator(z.object({ params: TodoIDParam })), todoController.deleteTodo);