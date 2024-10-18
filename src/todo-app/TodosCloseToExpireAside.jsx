import { useState } from "react";

import { ChevronDown, Calendar } from "react-feather";

import styles from "./css/TodosCloseToExpireAside.module.css"

function TodosCloseToExpireListItem({ todo: { todoText, todoDate } }) {
  const {closeToExpireItem} = styles

  return (
      <li className={`${closeToExpireItem} bg-zinc-700 bg-opacity-65 p-1 line-clamp-1`}>{todoText} ({todoDate})</li>
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
          <button onClick={toggleExpandTodos} className="flex justify-between items-center w-full p-2 rounded bg-zinc-900 text-start bg-opacity-50">{amountOfTodosCloseToExpire} tarefa(s) perto de vencer <ChevronDown size={20} className={isExpanded ? "rotate-180" : ""}/></button>
          {isExpanded && <ul className="mt-3 rounded overflow-hidden"> {todosCloseToExpireDate.map(todo => <TodosCloseToExpireListItem key={todo.id} todo={todo}/>)} </ul>}
        </div> :
        <p className="text-zinc-300">Tudo em dia.</p>
      }
    </>
  )
}

export function TodosCloseToExpireAside({ todos }) {
  const thereAreNoTodos = todos.length === 0

  return (  
    <div className="mb-4 p-4 border-2 border-zinc-500 rounded-md bg-zinc-800 shadow-normal">
      <h2 className="mb-2 text-2xl">Perto de Expirar</h2>

      {
        thereAreNoTodos ?
        <p className="text-zinc-300">
          Crie tarefas para monitorar seus prazos.
        </p> :
        <TodosCloseToExpireList todos={todos} />
      }
    </div>
  )
}