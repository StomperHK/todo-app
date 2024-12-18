import { useState, useContext } from "react";

import { IconButton } from "../components/IconButton";
import { Input } from "../components/Input";
import { ChevronDown, CornerDownLeft } from 'react-feather';
import { getCurrentDate } from "../lib/getCurrentDate";

import { ModalAndToasterContext } from "../lib/modalAndToasterContext"
import { TodosStorageMethodsContext } from "../lib/todosStorageMethodsContext"


export function TodoForm({ startingId, addTodoDispatcher }) {
  const [moreDetailtsAreVisible, setMoreDetailsAreVisible] = useState(false)
  const { showToaster } = useContext(ModalAndToasterContext)
  const todosStorageMethods = useContext(TodosStorageMethodsContext)

  let todoId = startingId + 1
  const inputMinimalDate = getCurrentDate()

  function handleToggleDescription() {
    setMoreDetailsAreVisible(state => !state)
  }

  async function handleAddTodo(event) {
    event.preventDefault()

    const todoFormData = new FormData(event.target)
    const todoText = todoFormData.get("todo-name").trim()
    const todoDescription = todoFormData.get("todo-description") || ""
    const todoDate = todoFormData.get("todo-date") || ""
    const todoPriority = todoFormData.get("todo-priority") || "baixo"

    if (!todoText) return

    const todoDateAsMiliseconds = todoDate ? Date.parse(todoDate) : ""
    const todoData = {todoText, todoDescription, todoDate, todoDateAsMiliseconds, todoPriority}
    const response = await todosStorageMethods.addTodoOnDatabase(todosStorageMethods.database, todoData)

    if (response.status === "error") {
      showToaster("error", "Não foi possível adicionar a tarefa.")
      return
    }
    
    addTodoDispatcher(todoId, todoText, todoDescription, todoDate, todoDateAsMiliseconds, todoPriority)
  }
  
  return (
    <>
      <form onSubmit={handleAddTodo} className="mb-5 p-3 rounded bg-zinc-950/30 bg-opacity-80">
        <div className="flex items-center gap-3">
          <Input type="text" placeholder="título da tarefa" name="todo-name" className="grow" />
          
          <IconButton type="button" onClick={handleToggleDescription} aria-expanded={moreDetailtsAreVisible ? "true" : "false"} aria-controls="todo-form-more-details" aria-label="exibir campo de descrição" title="exibir campo de descrição" className="rounded-full active:bg-zinc-600"><ChevronDown size={20} className={moreDetailtsAreVisible ? "rotate-180" : ""} /></IconButton>

          <IconButton type="submit" aria-label="criar tarefa" title="criar tarefa" className="rounded rounded-br-lg active:bg-zinc-600 max-430:hidden"><CornerDownLeft className="w-7 h-auto"  /></IconButton>
          <IconButton type="submit" aria-label="criar tarefa" title="criar tarefa" className="rounded rounded-br-lg hidden active:bg-zinc-600 max-430:block"><CornerDownLeft size={20}  /></IconButton>
        </div>

        { 
          moreDetailtsAreVisible && (
            <div id="todo-form-more-details">
              <Input textarea placeholder="descrição da tarefa" name="todo-description" className="w-full my-4" />

              <div className="flex justify-around gap-3 max-520:flex-col">
                <label>
                  Para Quando é:<br/>
                  <input type="date" name="todo-date" min={inputMinimalDate} aria-label="definir a data" className="mt-2 w-[160px] bg-transparent border-2 border-zinc-500 p-1 rounded outline-none transition-colors duration-150 focus:border-zinc-300 max-520:w-full" />
                </label>

                <label>
                  Nível de Prioridade:<br/>
                  <select name="todo-priority" defaultValue="baixo" className="mt-2 w-[160px] p-1.5 bg-transparent border-2 rounded outline-none border-zinc-500 transition-colors duration-150 focus:border-zinc-300 max-520:w-full">
                    <option value="alto" className="text-black">urgente</option>
                    <option value="médio" className="text-black">normal</option>
                    <option value="baixo" className="text-black">pouco importante</option>
                  </select>
                </label>
              </div>
            </div>
          )
        }
      </form>
    </>
  )
}