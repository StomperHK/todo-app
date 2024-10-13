import { Input } from "../components/Input";
import { Button } from "../components/Button";

import { Check } from "react-feather";


export function TodoItemContent({ isEditing, isExpanded, todoId, todoText, todoDescription, checked, onSubmit }) {
  const todoHasDescription = todoDescription !== ""

  return (
    !isEditing ?
    (
      <div className="self-center p-2 rounded w-full bg-zinc-800 bg-opacity-60">
        <p className={`text-start select-none break-all ${isExpanded ? "" : "line-clamp-1"} ${checked ? "line-through" : ""}`}>{todoText}</p>
        { (todoHasDescription && isExpanded) && <p className="mt-3 pt-3 border-t-2 border-zinc-600 text-zinc-300">{todoDescription}</p>}
      </div>
    ) :
    (
      <form onSubmit={onSubmit} className="flex items-start gap-3 p-2 w-full rounded-md bg-zinc-800 bg-opacity-60">
        <div className="w-full">
          <Input type="text" defaultValue={todoText} name={"new-todo-text-" + todoId} placeholder="novo título da tarefa" className="w-full" />
          {todoHasDescription && <Input textarea defaultValue={todoDescription} name={"new-todo-description-" + todoId} placeholder="nova descrição da tarefa" className="w-full mt-4" />}
        </div>

        
        <Button >salvar <Check size={20} /></Button>
      </form>
    )
  )
}