import { useState, useReducer } from "react";

import { IconButton } from "../components/IconButton";
import { Input } from "../components/Input";
import { ArrowRight, Eye, EyeOff, CornerDownLeft } from 'react-feather';


let todoId = 0;


export function TodoForm({ addTodoDispatcher }) {
  const [descriptionIsVisible, setDescriptionIsVisible] = useState(false)

  function handleToggleDescription() {
    setDescriptionIsVisible(state => !state)
  }

  function handleAddTodo(event) {
    event.preventDefault()

    const todoFormData = new FormData(event.target)
    const todoText = todoFormData.get("todo-name")
    const todoDescription = todoFormData.get("todo-description") || ""

    if (!todoText) return
    
    addTodoDispatcher(todoId++, todoText, todoDescription)
  }

  return (
    <>
      <form onSubmit={handleAddTodo} className="mb-5">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <Input type="text" placeholder="título da tarefa" name="todo-name" className="grow" />
          { descriptionIsVisible && <Input textarea placeholder="descrição da tarefa" name="todo-description" className="w-full shrink-0 order-1" />}
          
          <IconButton type="button" onClick={handleToggleDescription} aria-label="exibir campo de descrição" title="exibir campo de descrição" className="rounded-full">{descriptionIsVisible ? <EyeOff size={20} /> : <Eye size={20} />}</IconButton>
          <IconButton type="submit" aria-label="criar tarefa" title="criar tarefa" className="rounded"><CornerDownLeft size={28} /></IconButton>
        </div>
      </form>
    </>
  )
}