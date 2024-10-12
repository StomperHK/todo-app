import { useReducer } from "react";

import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";

import styles from "./css/Todo.module.css"

import { todosReducer } from "../lib/todosReducer";


export function Todo() {
  const [todos, dispatch] = useReducer(todosReducer, [])

  const { todoList } = styles

  function addTodoDispatcher(todoId, todoText, todoDescription) {
    dispatch({
      type: "add",
      todoId: todoId,
      todoText,
      todoDescription
    })
  }

  function deleteTodoDispatcher(todoId) {
    dispatch({
      type: "delete",
      todoId
    })
  }

  function editTodoDispatcher(todoId, newTodoText, newTodoDescription) {
    dispatch({
      type: "edit",
      todoId,
      newTodoText,
      newTodoDescription
    })
  }

  function checkTodoDispatcher(todoId) {
    dispatch({
      type: "check",
      todoId
    })
  }

  return (
    <div className="max-w-2xl w-[90%] m-auto mt-10 mb-10 p-4 rounded-md bg-zinc-800">
      <h1 className="text-center uppercase mb-3">Todo App</h1>

      <TodoForm addTodoDispatcher={addTodoDispatcher} />

      <ul className={`${todoList} rounded-md overflow-hidden`}>
        {
          todos.map((todo) => <TodoItem key={todo.todoId} {...todo} deleteTodoDispatcher={deleteTodoDispatcher} editTodoDispatcher={editTodoDispatcher} checkTodoDispatcher={checkTodoDispatcher} />)
        }
      </ul>
    </div>
  )
}