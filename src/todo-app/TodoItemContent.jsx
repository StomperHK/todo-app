import { Input } from "../components/Input";
import { Button } from "../components/Button";

import { Check } from "react-feather";


export function TodoItemContent({ isEditing, isExpanded, todoId, todoText, todoDescription, checked, onSubmit }) {
  const todoHasDescription = todoDescription !== ""

  if (isExpanded) {
    return (
      <div className="p-3 w-full bg-zinc-700 bg-opacity-60">
        <p className={`text-start select-none break-all`}>{todoText}</p>
        { (todoHasDescription) && <p className="mt-3 pt-3 border-t-2 border-zinc-600 text-zinc-300">{todoDescription}</p> }
      </div>
    )
  }

  if (isEditing) {
    return (
      <form onSubmit={onSubmit} className="flex items-start gap-3 p-3 w-full bg-zinc-700 bg-opacity-60 max-520:flex-col max-520:items-center">
        <div className="w-full">
          <Input type="text" defaultValue={todoText} name={"new-todo-text-" + todoId} placeholder="novo título da tarefa" className="w-full" />
          { todoHasDescription && <Input textarea defaultValue={todoDescription} name={"new-todo-description-" + todoId} placeholder="nova descrição da tarefa" className="w-full mt-4" /> }
        </div>

        <Button >salvar <Check size={20} /></Button>
      </form>
    )
  }
}