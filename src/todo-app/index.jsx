import { useState, useReducer, useEffect, useRef, useContext } from "react";

import { Toaster } from "../components/Toaster";
import { Modal } from "../components/Modal";
import { Sidebar } from "./Sidebar";
import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";

import styles from "./css/Todo.module.css";
import { todosReducer } from "../lib/todosReducer";
import { ModalContext } from "../lib/modalContext";
import { getTodosStorageMethods } from "../lib/todosStorage";


export function Todo() {
  const [toasterState, setToasterState] = useState({isVisible: false, status: "", title: ""})
  const [modalState, setModalState] = useState({isVisible: false, title:"", description: "", action: null })
  const [todos, dispatch] = useReducer(todosReducer, [])

  let todosStorageMethodsRef = useRef(null)

  const { todoList } = styles


  useEffect(manageTodosStorage, [todos])

  
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

      showToaster("error", "Serviço para armazenar tarefas indisponível")
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

  function showToaster(newStatus, newTitle) {
    const stateCopy = {isVisible: true, status: newStatus, title: newTitle}

    setToasterState(stateCopy)
  }

  function showModal(newTitle, newTodoDescription, newAction) {
    const stateCopy = {isVisible: true, title: newTitle, description: newTodoDescription, action: newAction}

    setModalState(stateCopy)
  }

  return (
    <div className="min-h-[100svh] bg-peaks">   {/* backround wrapper */}
      <h1 className="text-center uppercase my-5">Todo App</h1>

      <ModalContext.Provider value={showModal}>
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
      </ModalContext.Provider>

      <Toaster toasterState={toasterState} setToasterState={setToasterState} />

      <Modal modalState={modalState} setModalState={setModalState} />
    </div>
  )
}