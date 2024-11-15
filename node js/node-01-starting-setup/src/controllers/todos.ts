import { RequestHandler } from "express";
import { Todo } from "../models/todo";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
    const text = (req.body as { text: string }).text;
    const newTodos: Todo = new Todo(Math.random().toString(), req.body.text);
    TODOS.push(newTodos);
    res.status(201).json({message: 'Created the todo.', createdTodo: newTodos});
};

export const getTodos: RequestHandler = (req, res, next) => {
    res.json({todos: TODOS});
}

export const updateTodo: RequestHandler = (req, res, next) => {
    const id = (req.params as { id: string }).id;
    const todoIndex = TODOS.findIndex(todo => todo.id === id);
    if (todoIndex < 0) {
        throw new Error('Could not find todo.');
    }

    TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, req.body.text);
    res.json({message: 'Updated todo.', updateTodo: TODOS[todoIndex] });
}    

export const deleteTodo: RequestHandler = (req, res, next) => {
    const id = (req.params as { id: string }).id;
    const todoIndex = TODOS.findIndex(todo => todo.id === id);
    if (todoIndex < 0) {
        throw new Error('Could not find todo.');
    }
    TODOS.splice(todoIndex, 1);
    res.json({message: 'Deleted todo.', deleteTodo:TODOS[todoIndex] });
}  