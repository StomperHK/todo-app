import { useState, useReducer } from "react";

import { IconButton } from "../components/IconButton";
import { Checkbox } from "../components/Checkbox";
import { TodoItemContent } from "./TodoItemContent";
import { Trash2, Edit2, X, ChevronDown } from 'react-feather';


export function TodoItem({ todoId, todoText, todoDescription, checked, deleteTodoDispatcher, editTodoDispatcher, checkTodoDispatcher }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const todoHasDescription = todoDescription !== ""

  function showEditForm() {
    setIsEditing(true)
    setIsExpanded(true)
  }

  function hideEditForm() {
    setIsEditing(false)
    setIsExpanded(false)
  }

  function handleEditTodo(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const newTodoText = formData.get("new-todo-text-" + todoId)
    const newTodoDescription = formData.get("new-todo-description-" + todoId) || ""

    if (newTodoText === "") return

    editTodoDispatcher(todoId, newTodoText, newTodoDescription)
  }

  function toggleIsExpanded() {
    setIsExpanded(state => !state)
  }

  return (
    <li className="flex gap-5 px-3 py-2.5 items-start box-content bg-zinc-700">
      <label className="flex gap-5 min-h-[36px] w-full items-start" aria-label="marcar ou dermarcar tarefa">
        <Checkbox checked={checked} onChange={() => checkTodoDispatcher(todoId)} className="translate-y-[8px]" />

        <TodoItemContent isEditing={isEditing} isExpanded={isExpanded} todoId={todoId} todoText={todoText} todoDescription={todoDescription} checked={checked} onSubmit={handleEditTodo} />
        
        { (todoHasDescription && !isEditing) && <IconButton onClick={toggleIsExpanded} sm className={`rounded-md translate-y-[4px] ${isExpanded ? "rotate-180" : ""}`}>
          <ChevronDown size={20}/>
        </IconButton> }
      </label>

      <div className="tools flex items-center gap-3">
        <IconButton onClick={!isEditing ? showEditForm : hideEditForm} className="rounded-md" aria-label="editar tarefa" title="editar tarefa">
          {
            !isEditing ?
            <Edit2 size={20} /> :
            <X size={20} />
          }
        </IconButton>
        <IconButton onClick={() => deleteTodoDispatcher(todoId)} className="rounded-md" aria-label="remover tarefa" title="remover tarefa"><Trash2 size={20}/></IconButton>
      </div>
    </li>
  )
}