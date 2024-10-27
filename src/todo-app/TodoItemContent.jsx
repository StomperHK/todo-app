import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Check, Calendar } from "react-feather";

import { getCurrentDate } from "../lib/getCurrentDate";
import { formatDate } from "../lib/formatDate";


export function TodoItemContent({ isEditing, isExpanded, todoId, todoText, todoDescription, todoDate, todoPriority,checked, onSubmit }) {
  const todoHasDescription = todoDescription !== ""
  const todoHasDate = todoDate !== ""
  const inputMinimalDate = getCurrentDate()
  

  if (isExpanded) {
    return (
      <div className="p-3 pl-5 w-full bg-zinc-700 bg-opacity-60">
        <p className={`text-start break-all`}>{todoText}</p>

        { (todoDescription || todoHasDate) && <hr className="border-2 border-zinc-600 mt-3" />}
        { (todoHasDescription) && <p className="mt-3 text-zinc-300">{todoDescription}</p> }
        { todoHasDate && <time dateTime={todoDate} className="flex items-center gap-3 mt-3"><Calendar size={20} /> {formatDate(todoDate)}</time> }
      </div>
    )
  }

  if (isEditing) {
    return (
      <form onSubmit={onSubmit} className="flex items-start gap-4 p-3 pl-5 w-full bg-zinc-700 bg-opacity-60 max-580:flex-col max-580:items-center">
        <div className="w-full">
          <Input type="text" defaultValue={todoText} name={"new-todo-text-" + todoId} placeholder="novo título da tarefa" className="w-full" />
          <Input textarea defaultValue={todoDescription} name={"new-todo-description-" + todoId} placeholder="nova descrição da tarefa" className="w-full mt-4 mb-4" />

          <div className="flex justify-around gap-3 max-520:flex-col">
            <label>
              Alterar data:<br/>
              <input type="date" defaultValue={todoDate} name={"new-todo-date-" + todoId} min={inputMinimalDate} aria-label="definir a data" className="mt-2 min-w-[160px] bg-transparent border-2 border-zinc-500 p-1 rounded outline-none transition-colors duration-150 focus:border-zinc-300 max-520:w-full" />
            </label>

            <label>
              Alterar Prioridade:<br/>
              <select name={"new-todo-priority-" + todoId} defaultValue={todoPriority} className="mt-2 p-1.5 min-w[160px] bg-transparent border-2 rounded outline-none border-zinc-500 transition-colors duration-150 focus:border-zinc-300 max-520:w-full">
                <option value="alto" className="text-black">urgente</option>
                <option value="médio" className="text-black">normal</option>
                <option value="baixo" className="text-black">pouco importante</option>
              </select>
            </label>
          </div>
        </div>

        <Button > salvar <Check size={20} /></Button>
      </form>
    )
  }
}