import { useState, useReducer, useEffect, useRef } from "react";

import { Toaster } from "./Toaster";
import { Sidebar } from "./Sidebar";
import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";

import styles from "./css/Todo.module.css";
import { todosReducer } from "../lib/todosReducer";
import { getTodosStorageMethods } from "../lib/todosStorage";


export function Todo() {
  const [toasterState, setToasterState] = useState({isVisible: false, text: ""})
  const [todos, dispatch] = useReducer(todosReducer, [])

  let todosStorageMethods = useRef({})

  const { todoList } = styles


  useEffect(manageTodosStorage, [todos])

  
  function manageTodosStorage() {
    const todosHaveBeenLoaded = Object.keys(todosStorageMethods.current).length

    if (!todosHaveBeenLoaded) {
      loadTodos()
    }
    else {
      saveTodos()
    }
  }

  function loadTodos() {
    todosStorageMethods.current = getTodosStorageMethods()

    if (todosStorageMethods.current.status === "local-storage-not-supported") {
      console.error("Error when accessing localStorage")
      todosStorageMethods.current = {}
      return
    }
    
    const todosData = todosStorageMethods.current.loadTodosData()
    const errorOccurred = todosData && todosData.status === "parse-error"
    
    if (todosData === null) {
      console.log("No data to load")
      return
    }
    if (errorOccurred) {
      console.log("Error when parsing todos")
      todosStorageMethods.current = {}
      return
    }
    
    loadTodosDispatcher(todosData)
  }

  function saveTodos() {
    const setTodosDataResult = todosStorageMethods.current.setTodosData(todos).status

    if (!setTodosDataResult === "quota-exceeded-error") {
      console.error("No storage disponible")
    }
  }

  function addTodoDispatcher(todoId, todoText, todoDescription, todoDate, todoDateAsMiliseconds, todoPriority) {
    dispatch({
      type: "add",
      todoId: todoId,
      todoText,
      todoDescription,
      todoDate,
      todoDateAsMiliseconds,
      todoPriority
    })
  }

  function deleteTodoDispatcher(todoId) {
    dispatch({
      type: "delete",
      todoId
    })
  }

  function editTodoDispatcher(todoId, newTodoText, newTodoDescription, newTodoDate, newTodoDateAsMiliseconds, newTodoPriority) {
    dispatch({
      type: "edit",
      todoId,
      newTodoText,
      newTodoDescription,
      newTodoDate,
      newTodoDateAsMiliseconds,
      newTodoPriority
    })
  }

  function checkTodoDispatcher(todoId) {
    dispatch({
      type: "check",
      todoId
    })
  }

  function loadTodosDispatcher(todosData) {
    dispatch({
      type: "load-todos",
      todosData: todosData
    })
  }

  return (
    <div className="min-h-[100svh] bg-peaks">   {/* backround wrapper */}
      <h1 className="text-center uppercase my-5">Todo App</h1>

      <div className=" w-fit m-auto mt-10 mb-10 relative">    {/* position wrapper */}
        <Sidebar todos={todos} />

        <main className="order-1 max-w-xl w-[90svw]  py-3 px-4 border-2 border-zinc-500 rounded-md bg-zinc-800 shadow-normal">
          <h2 className="text-center  mb-3">Criar Tarefa</h2>
          <TodoForm addTodoDispatcher={addTodoDispatcher} />
          <ul className={`${todoList} rounded-md overflow-hidden`}>
            {
              todos.map((todo) => <TodoItem key={todo.todoId} {...todo} deleteTodoDispatcher={deleteTodoDispatcher} editTodoDispatcher={editTodoDispatcher} checkTodoDispatcher={checkTodoDispatcher} />)
            }
          </ul>
        </main>
      </div>

      <Toaster toasterState={toasterState} setToasterState={setToasterState} />
    </div>
  )
}