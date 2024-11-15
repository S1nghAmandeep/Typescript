import { Router } from "express";
import { createTodo, deleteTodo, getTodos, updateTodo } from '../controllers/todos';



const router = Router();

router.get("/", getTodos);

router.post("/", createTodo, (req, res) => {
    res.send("todos");
});

router.patch("/:id", updateTodo, (req, res) => {
    res.send("todos");
});

router.delete("/:id", deleteTodo, (req, res) => { 
    res.send("todos");
});


export default router;