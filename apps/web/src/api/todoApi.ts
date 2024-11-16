import axios, { AxiosError } from "axios";
import "@tanstack/react-query";
import { Api, Schema } from "@mono/types";

declare module "@tanstack/react-query" {
    interface Register {
        defaultError: AxiosError;
    }
}

const apiURL: string = import.meta.env.VITE_API_URL;

const todoApi = axios.create({ baseURL: `${apiURL}/todo` });

export const getHomePage = async (): Promise<Api.Message> => (await axios.get(apiURL + "/home")).data;

export const getTodoList = async (): Promise<Api.TodoObjs> => (await todoApi.get('/')).data;

export const getTodo = async (id: string): Promise<Api.TodoObj> => (await todoApi.get(`/${id}`)).data;

export const createTodo = async (todo: Schema.Todo): Promise<Api.TodoObj> => (await todoApi.post('/', todo)).data;

export const updateTodo = async (id: string, todo: Schema.Todo): Promise<void> => (await todoApi.patch(`/${id}`, todo)).data;

export const deleteTodo = async (id: string): Promise<void> => (await todoApi.delete(`/${id}`)).data;
