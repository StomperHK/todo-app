import { useState } from "react";

import { ChevronDown } from "react-feather";

import { formatDate } from "../lib/formatDate";


import styles from "./css/TodosCloseToExpireAside.module.css"

function TodosCloseToExpireListItem({ todo: { todoText, todoDate } }) {
  const {closeToExpireItem} = styles

  return (
      <li className={`${closeToExpireItem} bg-zinc-700 bg-opacity-65 p-1 px-2 line-clamp-1`}><time dateTime={todoDate}>{formatDate(todoDate)}</time> - {todoText} </li>
  )
}

function TodosCloseToExpireList({ todos }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const currentDateAsMiliseconds = Date.now()
  const milisecondsInThreeDays = 259200000
  const todosCloseToExpireDate = getTodosCloseToExpire()
  const amountOfTodosCloseToExpire = todosCloseToExpireDate.length

  function getTodosCloseToExpire() {
    return todos.reduce((accum, todo) => {
      const todoIsChecked = todo.checked
      const todoDateAsMiliseconds = todo.todoDateAsMiliseconds

      if (!todoIsChecked && todoDateAsMiliseconds && todoDateAsMiliseconds - currentDateAsMiliseconds < milisecondsInThreeDays) {
        accum.push(todo)
      }
      
      return accum
    }, [])
  }

  function toggleExpandTodos() {
    setIsExpanded(isExpanded => !isExpanded)
  }

  return (
    <>
      {
        amountOfTodosCloseToExpire ? 
        <div>
          <button onClick={toggleExpandTodos} className={`${isExpanded ? "rounded-t" : "rounded"} flex shadow-normal justify-between items-center w-full p-1.5 px-2 border-2 border-zinc-600 bg-zinc-800 text-start bg-opacity-50`}>
            {amountOfTodosCloseToExpire} tarefa(s) perto de vencer <ChevronDown size={20} className={isExpanded ? "rotate-180" : ""}/>
          </button>
          {isExpanded && <ul className="rounded-b overflow-hidden"> {todosCloseToExpireDate.map(todo => <TodosCloseToExpireListItem key={todo.id} todo={todo}/>)} </ul>}
        </div> :
        <p className="text-zinc-300 mt-3">Tudo em dia.</p>
      }
    </>
  )
}

export function TodosCloseToExpireAside({ todos }) {
  const thereAreNoTodos = todos.length === 0

  return (  
    <div className="mb-4 min-h-[116px] p-3 border-2 border-zinc-500 rounded-md bg-zinc-800 shadow-normal">
      <h2 className="mb-2 text-2xl">Perto de Expirar</h2>

      {
        thereAreNoTodos ?
        <p className="text-zinc-300 mt-3">
          Crie tarefas para monitorar seus prazos.
        </p> :
        <TodosCloseToExpireList todos={todos} />
      }
    </div>
  )
}