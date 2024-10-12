import { useReducer } from "react";

import { Button } from "../components/Button";
import { CircleButton } from "../components/CircleButton";
import { Checkbox } from "../components/Checkbox";
import { ArrowRight, Trash2, Edit2 } from 'react-feather';

import { todosReducer } from "../lib/todosReducer";


let todoId = 0;

function TodoForm({ handleAddTodo }) {
  function handleSaveTodo(event) {
    event.preventDefault()

    const todoFormData = new FormData(event.target)
    const todoText = todoFormData.get("todo-name")

    if (!todoText) return

    handleAddTodo(++todoId, todoText)
  }

  return (
    <form onSubmit={handleSaveTodo} className="flex items-center gap-4 mb-5">
      <input className="w-full py-2 px-3 border-2 rounded-md border-zinc-500 bg-transparent outline-none transition-colors duration-150 focus:border-zinc-300" type="text" name="todo-name" />
      <Button type="submit">criar <ArrowRight size={20} /></Button>
    </form>
  )
}


function TodoItem({ todoId, todoText, checked, handleDeleleteTodo, handleEditTodo, handleCheckTodo }) {
  return (
    <li className="flex gap-2 px-3 py-2 items-center bg-zinc-800">
      <label className="flex gap-3 w-full">
        <Checkbox checked={checked} onChange={() => handleCheckTodo(todoId)} />
        <span>{todoText}</span>
      </label>

      <div className="tools flex items-center gap-3">
        <CircleButton aria-label="editar tarefa" title="editar tarefa"><Edit2 size={20} /></CircleButton>
        <CircleButton aria-label="remover tarefa" title="remover tarefa"><Trash2 size={20}/></CircleButton>
      </div>
    </li>
  )
}


export function Todo() {
  const [todos, dispatch] = useReducer(todosReducer, [])

  function handleAddTodo(todoId, todoText) {
    dispatch({
      type: "add",
      todoId,
      todoText
    })
  }

  function handleDeleleteTodo(todoId) {
    dispatch({
      type: "delete",
      todoId
    })
  }

  function handleEditTodo(todoId, newTodoText) {
    dispatch({
      type: "edit",
      todoId,
      newTodoText
    })
  }

  function handleCheckTodo(todoId) {
    dispatch({
      type: "check",
      todoId
    })
  }

  return (
    <div className="max-w-3xl m-auto mt-10  p-4 text-center rounded-md">
      <h1 className="text-center uppercase mb-3">Todo App</h1>

      <TodoForm handleAddTodo={handleAddTodo} />

      <ul className="rounded overflow-hidden">
        {
          todos.map((todo) => <TodoItem key={todo.todoId} {...todo} handleDeleleteTodo={handleDeleleteTodo} handleEditTodo={handleEditTodo} handleCheckTodo={handleCheckTodo} />)
        }
      </ul>
    </div>
  )
}