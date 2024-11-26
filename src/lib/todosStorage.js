import { testLocalStorageAvaliability } from "./testLocalStorageAvaliability"

const TODOS_STORAGE_KEY = "todos"

export async function getTodosDatabaseAndStorageMethods() {
  const localStorageData = loadTodosFromLocalStorage()

  const response = await openDatabaseConnection()

  if (response.status === "error") {
    return {status: "error", result: response.result}
  }

  const database = response.result
  
  if (localStorageData !== null) {
    addTodoOnDatabase(database, localStorageData)
  }
  
  return {
    database,
    loadTodosFromDatabase,
    addTodoOnDatabase,
    updateTodoOnDatabase,
    deleteTodoOnDatabase
  }
}

async function openDatabaseConnection() {
  return new Promise((resolve, reject) => {

    const request = indexedDB.open("todos", 2)

    request.onsuccess = (event) => {
      resolve({status: "success", result: event.target.result})
    }

    request.onupgradeneeded = (event) => {
      const database = event.target.result
      const objectStore = database.createObjectStore("todos", { keyPath: "todoId", autoIncrement: true })

      objectStore.createIndex("todoId", "todoId", { unique: true, })
      objectStore.createIndex("todoText", "todoText", { unique: false })
      objectStore.createIndex("todoDescription", "todoDescription", { unique: false })
      objectStore.createIndex("checked", "checked", { unique: false })
      objectStore.createIndex("todoDate", "todoDate", { unique: false })
      objectStore.createIndex("todoDateAsMiliseconds", "todoDateAsMiliseconds", { unique: false })
      objectStore.createIndex("todoPriority", "todoPriority", { unique: false })
    }

    request.onerror = (event) => {
      reject({status: "error", result: event.target.error})
    }
  })
}

function loadTodosFromDatabase(database) {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(["todos"], "readonly")

    const objectStore = transaction.objectStore("todos")
    const request = objectStore.getAll()

    return createRequestHandlers(request, resolve, reject, "get")
  })
}

function addTodoOnDatabase(database, todo) {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(["todos"], "readwrite")
    
    const objectStore = transaction.objectStore("todos")
    const request = objectStore.add(todo)
    
    return createRequestHandlers(request, resolve, reject, "get")
  })
}

function updateTodoOnDatabase(database, todoId, todoData) {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(["todos"], "readwrite")

    const objectStore = transaction.objectStore("todos")
    const request = objectStore.get(todoData, todoId)

    return createRequestHandlers(request, resolve, reject)
  })
}

function deleteTodoOnDatabase(database, todoId) {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(["todos"], "readwrite")

    const objectStore = transaction.objectStore("todos")
    const request = objectStore.delete(todoId)

    return createRequestHandlers(request, resolve, reject)
  })
}

function createRequestHandlers(request, resolve, reject, type=null) {
  request.onsuccess = (event) => {
    resolve({status: "success", result: type === "get" ? event.target.result : null})
  }

  request.onerror = (event) => {
    reject({status: "error", result: event.target.error})
  }
}



function loadTodosFromLocalStorage() {    // load all data that is saved in local storage and deletes it afterwards, this way the user wont loose data that was saved before the app was updated to use indexedDB
  try {
    const localStorageIsAvaliable = testLocalStorageAvaliability().status === "sucess"

    if (!localStorageIsAvaliable) return

    const todosData = localStorage.getItem(TODOS_STORAGE_KEY)
    localStorage.removeItem(TODOS_STORAGE_KEY)
    return JSON.parse(todosData)
  }
  catch(e) {
    return {status: "parse-error"}
  }
}
