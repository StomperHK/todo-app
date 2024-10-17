import { useReducer } from "react";

import { Sidebar } from "./Sidebar";
import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";

import styles from "./css/Todo.module.css";
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
    <div className="min-h-[100svh] bg-peaks">   {/* backround wrapper */}
      <h1 className="text-center uppercase my-5">Todo App</h1>

      <div className=" w-fit m-auto mt-10 mb-10 relative">    {/* position wrapper */}
        <Sidebar todos={todos} />

        <main className="order-1 max-w-xl w-[90svw] p-4 border-2 border-zinc-500 rounded-md bg-zinc-800 shadow-normal">
          <h2 className="text-center  mb-3">Criar Tarefa</h2>
          <TodoForm addTodoDispatcher={addTodoDispatcher} />
          <ul className={`${todoList} rounded-md overflow-hidden`}>
            {
              todos.map((todo) => <TodoItem key={todo.todoId} {...todo} deleteTodoDispatcher={deleteTodoDispatcher} editTodoDispatcher={editTodoDispatcher} checkTodoDispatcher={checkTodoDispatcher} />)
            }
          </ul>
        </main>
      </div>

    </div>
  )
}