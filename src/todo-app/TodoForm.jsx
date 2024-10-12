import { useState, useReducer } from "react";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { ArrowRight, Eye, EyeOff } from 'react-feather';


let todoId = 0;


export function TodoForm({ addTodoDispatcher }) {
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
      <form onSubmit={handleAddTodo} className="mb-5">
        <div className="flex flex-wrap items-center gap-4 mb-5">
          <Input type="text" placeholder="título da tarefa" name="todo-name" className="grow" />
          { descriptionIsVisible && <Input textarea placeholder="descrição da tarefa" name="todo-description" className="w-full shrink-0 order-1" />}
          
          <Button type="button" onClick={handleToggleDescription}>descrição {descriptionIsVisible ? <EyeOff size={18} /> : <Eye size={18} />}</Button>
        </div>

        <div className="flex justify-end"><Button type="submit" >criar <ArrowRight size={20} /></Button></div>
      </form>
    </>
  )
}