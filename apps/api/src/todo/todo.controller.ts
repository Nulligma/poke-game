import { NextFunction, Request, Response } from "express";
import { Todos } from "./todo.model";
import { ObjectId } from "mongodb";
import { Todo, TodoIDParam, TodoWithID, UpdateTodoBody } from "@mono/types/src/schema/database";

export const getTodoList = async (req: Request, res: Response<TodoWithID[]>, next: NextFunction) => {
    try {
        const todoList = await Todos.find().toArray();
        res.json(todoList);
    } catch (error) {
        next(error);
    }
}

export const addTodo = async (req: Request<{}, TodoWithID, Todo>, res: Response<TodoWithID>, next: NextFunction) => {
    try {
        const r = await Todos.insertOne(req.body);
        if (!r.acknowledged) throw new Error('Error inserting new todo');
        res.status(201);
        res.json({
            _id: r.insertedId,
            ...req.body
        });
    } catch (error) {
        next(error);
    }
}

export const getATodo = async (req: Request<TodoIDParam, TodoWithID>, res: Response<TodoWithID>, next: NextFunction) => {
    try {
        const todo = await Todos.findOne({ _id: new ObjectId(req.params.id) });
        if (!todo) {
            res.status(404);
            throw new Error(`Recipe not found for id: ${req.params.id}`);
        } else
            res.json(todo);
    } catch (error) {
        next(error);
    }
}

export const updateTodo = async (req: Request<TodoIDParam, UpdateTodoBody>, res: Response, next: NextFunction) => {
    try {
        const update = await Todos.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
        if (!update.acknowledged) throw new Error('Error updating todo');
        res.status(201).end();
    } catch (error) {
        next(error);
    }
}

export const deleteTodo = async (req: Request<TodoIDParam>, res: Response, next: NextFunction) => {
    try {
        const d = await Todos.deleteOne({ _id: new ObjectId(req.params.id) });
        if (!d.acknowledged) throw new Error('Error deleting todo');
        res.status(204).end();
    } catch (error) {
        next(error);
    }

}