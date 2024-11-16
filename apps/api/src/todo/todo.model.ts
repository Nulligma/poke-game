import { Schema } from "@mono/types";
import { db } from "../db";

export const Todos = db.collection<Schema.Todo>('todos');