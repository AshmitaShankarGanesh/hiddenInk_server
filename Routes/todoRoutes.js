import express from "express";

import {
  addTodo,
  getTodo,
  updateTodo,
  deleteTodo
} from "../Controller/todoController.js";

const route = express.Router()

route.post('/addtodo', addTodo);

route.get('/gettodo', getTodo);

route.put('/updatetodo', updateTodo);

route.delete('/deletetodo', deleteTodo);

export default route;
