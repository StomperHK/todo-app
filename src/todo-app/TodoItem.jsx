import { useState, useReducer } from "react";

import { IconButton } from "../components/IconButton";
import { Checkbox } from "../components/Checkbox";
import { TodoItemContent } from "./TodoItemContent";
import { Trash2, Edit2, X, ChevronDown } from 'react-feather';


export function TodoItem({ todoId, todoText, todoDescription, checked, deleteTodoDispatcher, editTodoDispatcher, checkTodoDispatcher }) {
  const [todoItemState, setTodoItemState] = useState("normal")    // avoid state paradox/contradiction, when multiple states control the same entity

  const isEditing = todoItemState === "editing"
  const isExpanded = todoItemState === "expanded"

  function showEditForm() {
    setTodoItemState("editing")
  }

  function hideEditForm() {
    setTodoItemState("normal")
  }

  function toggleExpandItem() {
    setTodoItemState(isExpanded ? "normal" : "expanded")
  }

  function handleEditTodo(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const newTodoText = formData.get("new-todo-text-" + todoId)
    const newTodoDescription = formData.get("new-todo-description-" + todoId) || ""

    if (newTodoText === "") return

    editTodoDispatcher(todoId, newTodoText, newTodoDescription)
  }


  return (
    <li>
      <div className="flex gap-5 px-3 py-2.5 items-center box-content bg-zinc-700 max-520:gap-3 max-520:py-2">
        <label className="flex gap-5 min-h-[36px] w-full items-center max-520:gap-3" aria-label="marcar ou dermarcar tarefa">
          <Checkbox checked={checked} onChange={() => checkTodoDispatcher(todoId)} />
      
          <p className={`p-2 rounded w-full bg-zinc-800 bg-opacity-60 text-start select-none break-all line-clamp-1 ${checked ? "line-through" : ""} max-520:py-1`}>{todoText}</p>
      
          <IconButton onClick={toggleExpandItem} sm aria-label="expandir tarefa" title="expandir tarefa" className={`rounded-md ${isExpanded ? "rotate-180" : ""}`}>
            <ChevronDown size={20}/>
          </IconButton>
        </label>

        <div className="tools flex items-center gap-3">
          <IconButton onClick={!isEditing ? showEditForm : hideEditForm} className="rounded-md max-520:p-1.5" aria-label="editar tarefa" title="editar tarefa">
            { !isEditing ? <Edit2 size={20} /> : <X size={20} /> }
          </IconButton>
          <IconButton onClick={() => deleteTodoDispatcher(todoId)} className="rounded-md max-520:p-1.5" aria-label="remover tarefa" title="remover tarefa"><Trash2 size={20}/></IconButton>
        </div>
      </div>

      <TodoItemContent isEditing={isEditing} isExpanded={isExpanded} todoId={todoId} todoText={todoText} todoDescription={todoDescription} checked={checked} onSubmit={handleEditTodo} />
    </li>
  )
}