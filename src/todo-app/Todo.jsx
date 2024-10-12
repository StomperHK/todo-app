import { useState, useReducer } from "react";

import { Button } from "../components/Button";
import { IconButton } from "../components/IconButton";
import { Checkbox } from "../components/Checkbox";
import { Input } from "../components/Input";
import { ArrowRight, Trash2, Edit2, X, Check, ChevronDown, Eye, EyeOff } from 'react-feather';

import { todosReducer } from "../lib/todosReducer";


let todoId = 0;

function TodoForm({ addTodoDispatcher }) {
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
    
      <div className="flex justify-end mb-3">
        <Button type="button" onClick={handleToggleDescription}>descrição {descriptionIsVisible ? <EyeOff size={18} /> : <Eye size={18} />}</Button>
      </div>

      <form onSubmit={handleAddTodo} className="flex flex-wrap items-center gap-4 mb-5">
        <Input type="text" placeholder="título da tarefa" name="todo-name" className="grow" />
        { descriptionIsVisible && <Input textarea placeholder="descrição da tarefa" name="todo-description" className="w-full shrink-0 order-1" />}
        <Button type="submit" >criar <ArrowRight size={20} /></Button>
      </form>
    </>
  )
}


function TodoItem({ todoId, todoText, todoDescription, checked, deleteTodoDispatcher, editTodoDispatcher, checkTodoDispatcher }) {
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

    console.log(newTodoText);
    

    editTodoDispatcher(todoId, newTodoText, newTodoDescription)
  }

  function toggleIsExpanded() {
    setIsExpanded(state => !state)
  }

  return (
    <li className="flex gap-5 px-3 py-2 items-start box-content bg-zinc-700">
      <label className="flex gap-5 min-h-[36px] w-full items-center" aria-label="marcar ou dermarcar tarefa">
        <Checkbox checked={checked} onChange={() => checkTodoDispatcher(todoId)} />
        {
          !isEditing ?
          (
            <div className="w-full">
              <p className={` text-start ${checked ? "line-through" : ""}`}>{todoText}</p>
              { (todoHasDescription && isExpanded) && <p>{todoDescription}</p>}
            </div>
          ) :
          (
            <form onSubmit={handleEditTodo} className="flex items-start gap-3 w-full">
              <div className="w-full">
                <Input type="text" defaultValue={todoText} name={"new-todo-text-" + todoId} placeholder="novo título da tarefa" className="w-full" />
                {todoHasDescription && <Input textarea defaultValue={todoDescription} name={"new-todo-description-" + todoId} placeholder="nova descrição da tarefa" className="w-full mt-4" />}
              </div>

              
              <Button className="bg-zinc-900 hover:bg-zinc-800">salvar <Check size={20} /></Button>
            </form>
          )
        }
        { (todoHasDescription && !isEditing) && <IconButton onClick={toggleIsExpanded} className={`p-1 rounded-md ${isExpanded ? "rotate-180" : ""}`}>
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


export function Todo() {
  const [todos, dispatch] = useReducer(todosReducer, [])

  function addTodoDispatcher(todoId, todoText, todoDescription) {
    dispatch({
      type: "add",
      todoId: todoId,
      todoText,
      todoDescription
    })
  }

  function deleteTodoDispatcher(todoId) {
    dispatch({
      type: "delete",
      todoId
    })
  }

  function editTodoDispatcher(todoId, newTodoText, newTodoDescription) {
    dispatch({
      type: "edit",
      todoId,
      newTodoText,
      newTodoDescription
    })
  }

  function checkTodoDispatcher(todoId) {
    dispatch({
      type: "check",
      todoId
    })
  }

  return (
    <div className="max-w-3xl m-auto mt-10 p-4 rounded-md bg-zinc-800 ">
      <h1 className="text-center uppercase mb-3">Todo App</h1>

      <TodoForm addTodoDispatcher={addTodoDispatcher} />

      <ul className="rounded-md overflow-hidden">
        {
          todos.map((todo) => <TodoItem key={todo.todoId} {...todo} deleteTodoDispatcher={deleteTodoDispatcher} editTodoDispatcher={editTodoDispatcher} checkTodoDispatcher={checkTodoDispatcher} />)
        }
      </ul>
    </div>
  )
}