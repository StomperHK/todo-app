import { useState, useReducer } from "react";

import { IconButton } from "../components/IconButton";
import { Input } from "../components/Input";
import { ChevronDown, CornerDownLeft } from 'react-feather';
import { getCurrentDate } from "../lib/getCurrentDate";


let todoId = 0;


export function TodoForm({ addTodoDispatcher }) {
  const [moreDetailtsAreVisible, setMoreDetailsAreVisible] = useState(false)

  const inputMinimalDate = getCurrentDate()

  function handleToggleDescription() {
    setMoreDetailsAreVisible(state => !state)
  }

  function handleAddTodo(event) {
    event.preventDefault()

    const todoFormData = new FormData(event.target)
    const todoText = todoFormData.get("todo-name").trim()
    const todoDescription = todoFormData.get("todo-description") || ""
    const todoDate = todoFormData.get("todo-date") || ""
    const todoPriority = todoFormData.get("todo-priority") || "baixo"

    if (!todoText) return

    const todoDateAsMiliseconds = todoDate ? Date.parse(todoDate) : ""
    
    addTodoDispatcher(todoId++, todoText, todoDescription, todoDate, todoDateAsMiliseconds, todoPriority)
  }

  return (
    <>
      <form onSubmit={handleAddTodo} className="mb-5 p-3 rounded bg-zinc-900 bg-opacity-50">
        <div className="flex items-center gap-3">
          <Input type="text" placeholder="título da tarefa" name="todo-name" className="grow" />
          
          <IconButton type="button" onClick={handleToggleDescription} aria-label="exibir campo de descrição" title="exibir campo de descrição" className="rounded-full"><ChevronDown size={20} className={moreDetailtsAreVisible ? "rotate-180" : ""} /></IconButton>

          <IconButton type="submit" aria-label="criar tarefa" title="criar tarefa" className="rounded rounded-br-lg max-430:hidden"><CornerDownLeft size={28}  /></IconButton>
          <IconButton type="submit" aria-label="criar tarefa" title="criar tarefa" className="rounded rounded-br-lg hidden max-430:block"><CornerDownLeft size={20}  /></IconButton>
        </div>

        { 
          moreDetailtsAreVisible && (
            <>
              <Input textarea placeholder="descrição da tarefa" name="todo-description" className="w-full my-5" />

              <div className="flex justify-around">
                <label>
                  Para Quando é:<br/>
                  <input type="date" name="todo-date" min={inputMinimalDate} aria-label="definir a data" className="mt-2 bg-transparent border-2 border-zinc-500 p-1 rounded outline-none transition-colors duration-150 focus:border-zinc-300" />
                </label>

                <label>
                  Nível de Prioridade:<br/>
                  <select name="todo-priority" defaultValue="baixo" className="mt-2 p-1.5 bg-transparent border-2 rounded outline-none border-zinc-500 transition-colors duration-150 focus:border-zinc-300">
                    <option value="alto" className="text-black">urgente</option>
                    <option value="médio" className="text-black">normal</option>
                    <option value="baixo" className="text-black">pouco importante</option>
                  </select>
                </label>
              </div>
            </>
          )
        }
      </form>
    </>
  )
}