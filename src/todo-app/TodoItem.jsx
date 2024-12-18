import { useState, useContext } from "react";

import { IconButton } from "../components/IconButton";
import { Checkbox } from "../components/Checkbox";
import { TodoItemContent } from "./TodoItemContent";
import { Trash2, Edit2, X, ChevronDown, Menu } from 'react-feather';

import { TodosStorageMethodsContext } from "../lib/todosStorageMethodsContext"
import { ModalAndToasterContext } from "../lib/modalAndToasterContext";
import styles from "./css/TodoItem.module.css"


export function TodoItem({ todoId, todoText, todoDescription, todoDate, todoPriority, checked, deleteTodoDispatcher, editTodoDispatcher, checkTodoDispatcher }) {
  const [todoItemState, setTodoItemState] = useState("normal")    // avoid state paradox, when multiple states control the same entity
  const [isPopperOpen, setIsPopperOpen] = useState(false)
  const {showModal} = useContext(ModalAndToasterContext)
  const todosStorageMethods = useContext(TodosStorageMethodsContext)
  const {toolsPopper} = styles

  const isEditing = todoItemState === "editing"
  const isExpanded = todoItemState === "expanded"
  const priorityTagColor = {alto: "bg-red-600", "médio": "bg-yellow-400", baixo: "bg-green-400"}[todoPriority]
  

  function showEditForm() {
    setTodoItemState("editing")
  }

  function hideEditForm() {
    setTodoItemState("normal")
  }

  function toggleExpandItem() {
    setTodoItemState(isExpanded ? "normal" : "expanded")
  }

  function toggleOpenPopper() {
    setIsPopperOpen(!isPopperOpen)
  }

  async function handleToggleCheckTodo() {
    const todoDateAsMiliseconds = Date.parse(todoDate)
    const todoData = {todoId, todoText, checked: !checked, todoDescription, todoDate, todoDateAsMiliseconds, todoPriority}
    const response = await todosStorageMethods.updateTodoOnDatabase(todosStorageMethods.database, todoData)

    if (response.status === "error") {
      showToaster("error", "Não foi possível marcar a tarefa.")
      return
    }
    

    checkTodoDispatcher(todoId)
  }

  async function handleEditTodo(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const newTodoText = formData.get("new-todo-text-" + todoId)
    const newTodoDescription = formData.get("new-todo-description-" + todoId) || ""
    const newTodoDate = formData.get("new-todo-date-" + todoId) || ""
    const newTodoPriority = formData.get("new-todo-priority-" + todoId) || ""

    if (newTodoText === "") return

    const newTodoDateAsMiliseconds = newTodoDate ? Date.parse(newTodoDate) : ""
    const todoData = {todoId, todoText: newTodoText, todoDescription: newTodoDescription, todoDate: newTodoDate, newTodoDateAsMiliseconds: newTodoDateAsMiliseconds, todoPriority: newTodoPriority}
    const response = await todosStorageMethods.updateTodoOnDatabase(todosStorageMethods.database, todoData)
    
    if (response.status === "error") {
      showToaster("error", "Não foi possível editar a tarefa.")
      return
    }

    editTodoDispatcher(todoId, newTodoText, newTodoDescription, newTodoDate, newTodoDateAsMiliseconds, newTodoPriority)
  }

  async function handleDeleteTodo() {
    const response = await todosStorageMethods.deleteTodoOnDatabase(todosStorageMethods.database, todoId)

    if (response.status === "error") {
      showToaster("error", "Não foi possível deletar a tarefa.")
      return
    }

    deleteTodoDispatcher(todoId)
  }


  return (
    <li className="relative">
      <div className="flex gap-4 px-3 py-2.5 pl-5 items-center box-content relative bg-zinc-700 max-520:gap-3 max-520:py-2">
        <label className="flex gap-4 min-h-[36px] w-full items-center max-520:gap-3" aria-label="marcar ou dermarcar tarefa">
          <Checkbox checked={checked} onChange={handleToggleCheckTodo} />
      
          <p className={`p-2 py-1.5 rounded w-full bg-zinc-800 bg-opacity-60 text-start select-none break-all line-clamp-1 ${checked ? "line-through" : ""} max-520:py-1`}>{todoText}</p>
      
          <IconButton onClick={toggleExpandItem} aria-expanded={isExpanded ? "true" : "false"} aria-controls={`todo-content-${todoId}`} sm aria-label="expandir tarefa" title="expandir tarefa" className={`rounded-md ${isExpanded ? "rotate-180" : ""}`}>
            <ChevronDown size={20}/>
          </IconButton>
        </label>

        <IconButton onClick={toggleOpenPopper} aria-label="mostrar opções de edição" aria-expanded={isPopperOpen ? "true" : "false"} aria-controls={"tools-popper-" + todoId} className="hidden max-520:p-1.5 max-430:block">{isPopperOpen ? <X size={20}/> : <Menu size={20}/>}</IconButton>

        <div id={"tools-popper-" + todoId} className={`${toolsPopper} ${isPopperOpen ? styles["toolsPopper--open"] : ""} w-[150px] border-2 p-1 rounded absolute bottom-[110%] right-3 border-zinc-500 bg-zinc-700`}>
          <button onClick={!isEditing ? showEditForm : hideEditForm} aria-expanded={isEditing ? "true" : "false"} aria-controls={`todo-edit-form-${todoId}`} className="flex w-full border-2 gap-2 mb-2 items-center rounded p-1 border-zinc-500 bg-zinc-600" aria-label="editar tarefa" title="editar tarefa">
            { !isEditing ? <Edit2 size={20} /> : <X size={20} /> }
            { !isEditing ? "abrir" : "fechar"   } edição
          </button>
          <button onClick={() => showModal("Deletar tarefa", "Quer mesmo deletar esta tarefa?", () => deleteTodoDispatcher(todoId))} className="flex w-full border-2 gap-2 items-center rounded p-1 border-zinc-500 bg-zinc-600" aria-label="remover tarefa" title="remover tarefa">
            <Trash2 size={20}/>
            excluir
          </button>
        </div>

        <div className="flex items-center gap-3 max-430:hidden">
          <IconButton onClick={!isEditing ? showEditForm : hideEditForm} aria-expanded={isEditing ? "true" : "false"} aria-controls={`todo-edit-form-${todoId}`} className="rounded max-520:p-1.5" aria-label="editar tarefa" title="editar tarefa">
            { !isEditing ? <Edit2 size={20} /> : <X size={20} /> }
          </IconButton>
          <IconButton onClick={() => showModal("Deletar tarefa", "Quer mesmo deletar esta tarefa?", handleDeleteTodo)} className="rounded max-520:p-1.5" aria-label="remover tarefa" title="remover tarefa"><Trash2 size={20}/></IconButton>
        </div>

        <div className={`remove-invert-filter priority-tag h-full w-2 absolute left-0 top-0 ${priorityTagColor}`}></div>
      </div>

      <TodoItemContent
        isEditing={isEditing} isExpanded={isExpanded}
        todoId={todoId} todoText={todoText} todoDescription={todoDescription} todoDate={todoDate} todoPriority={todoPriority} checked={checked}
        onSubmit={handleEditTodo}
      />
    </li>
  )
}