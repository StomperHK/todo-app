import { useState, useReducer } from "react";

import { IconButton } from "../components/IconButton";
import { Input } from "../components/Input";
import { ChevronDown, CornerDownLeft } from 'react-feather';


let todoId = 0;


export function TodoForm({ addTodoDispatcher }) {
  const [moreDetailtsAreVisible, setMoreDetailsAreVisible] = useState(false)

  function handleToggleDescription() {
    setMoreDetailsAreVisible(state => !state)
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
        <div className="flex items-center gap-3 mb-5">
          <Input type="text" placeholder="título da tarefa" name="todo-name" className="grow" />
          
          <IconButton type="button" onClick={handleToggleDescription} aria-label="exibir campo de descrição" title="exibir campo de descrição" className="rounded-full"><ChevronDown size={20} className={moreDetailtsAreVisible ? "rotate-180" : ""} /></IconButton>

          <IconButton type="submit" aria-label="criar tarefa" title="criar tarefa" className="rounded max-430:hidden"><CornerDownLeft size={28}  /></IconButton>
          <IconButton type="submit" aria-label="criar tarefa" title="criar tarefa" className="rounded hidden max-430:block"><CornerDownLeft size={20}  /></IconButton>
        </div>

        { 
          moreDetailtsAreVisible && (
            <>
              <Input textarea placeholder="descrição da tarefa" name="todo-description" className="w-full mb-5" />
              <label>Para quando é? <input type="date" className="bg-transparent border-2 border-zinc-500 p-1 ml-2 rounded-md outline-none focus:border-zinc-300" /></label>
            </>
          )
        }
      </form>
    </>
  )
}