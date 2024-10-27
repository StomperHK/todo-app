import { useState, useReducer, useEffect, useRef } from "react";

import { Header } from "../components/Header";
import { Toaster } from "../components/Toaster";
import { Modal } from "../components/Modal";
import { Sidebar } from "./Sidebar";
import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";

import { useLocation } from "react-router-dom";
import styles from "./css/Todo.module.css";
import { todosReducer } from "../lib/todosReducer";
import { ModalContext } from "../lib/modalContext";
import { getTodosStorageMethods } from "../lib/todosStorage";


export function TodoApp() {
  const [todos, dispatch] = useReducer(todosReducer, [])
  const [toasterState, setToasterState] = useState({isVisible: false, status: "", title: ""})
  const [modalState, setModalState] = useState({isVisible: false, title:"", description: "", action: null })
  const location = useLocation()

  let biggestId = 0
  const todosJSX = todos.map((todo) => {
    biggestId = todo.todoId > biggestId ? todo.todoId : biggestId
    

    return <TodoItem key={todo.todoId} {...todo} deleteTodoDispatcher={deleteTodoDispatcher} editTodoDispatcher={editTodoDispatcher} checkTodoDispatcher={checkTodoDispatcher} />
  })

  let todosStorageMethodsRef = useRef(null)

  const { todoList } = styles


  useEffect(manageTodosStorage, [todos])
  useEffect(showPage, [location])


  function manageTodosStorage() {
    const todosHaveBeenLoaded = todosStorageMethodsRef.current

    if (!todosHaveBeenLoaded) {
      loadTodos()
    }
    else {
      saveTodos()
    }
  }

  function loadTodos() {
    todosStorageMethodsRef.current = getTodosStorageMethods()

    if (todosStorageMethodsRef.current.status === "local-storage-not-supported") {
      todosStorageMethodsRef.current = null

      showToaster("error", "Serviço para armazenar tarefas indisponível.")
      return
    }
    
    const todosData = todosStorageMethodsRef.current.loadTodosData()
    const errorOccurred = todosData && todosData.status === "parse-error"
    
    if (todosData === null) return
    if (errorOccurred) {
      todosStorageMethodsRef.current = null
      
      showToaster("error", "Erro ao analisar dados.")
      return
    }
    
    loadTodosDispatcher(todosData)
  }

  function saveTodos() {
    const setTodosDataResult = todosStorageMethodsRef.current.setTodosData(todos).status

    if (!setTodosDataResult === "quota-exceeded-error") {
      showToaster("error", "Sem espaço para armazenar mais tarefas.")
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

  function showPage() {
    const hiddenSection = document.querySelector(".transition-transform-opacity")

    setTimeout(() => hiddenSection.classList.remove("opacity-5", "-translate-y-20"), 0)
    
  }

  function showToaster(newStatus, newTitle) {
    const newState = {isVisible: true, status: newStatus, title: newTitle}

    setToasterState(newState)
  }

  function showModal(newTitle, newTodoDescription, newAction) {
    const newState = {isVisible: true, title: newTitle, description: newTodoDescription, action: newAction}

    setModalState(newState)
  }

  return (
    <>
      <Header />
    
      <div className="opacity-5 -translate-y-20 transition-transform-opacity delay-300 duration-500">
        <h1 className="text-center uppercase my-5 max-520:text-3xl">Suas tarefas</h1>

        <ModalContext.Provider value={showModal}>
          <div className="flex items-start gap-4 w-fit m-auto mt-10 mb-10 -translate-x-[150px] max-1280:block max-1280:translate-x-0">
            <Sidebar todos={todos} />

            <main className="order-1 max-w-xl w-[90svw] py-3 px-4 border-2 border-zinc-500 rounded-md bg-zinc-800 shadow-normal">
              <h2 className="text-center  mb-3">Criar Tarefa</h2>
              <TodoForm startingId={biggestId} addTodoDispatcher={addTodoDispatcher} />
              <ul className={`${todoList} rounded-md`}>
                {
                  todosJSX
                }
              </ul>
            </main>
          </div>
        </ModalContext.Provider>

      </div>

      <Toaster toasterState={toasterState} setToasterState={setToasterState} />

      <Modal modalState={modalState} setModalState={setModalState} />
    </>
  )
}