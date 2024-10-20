const TODOS_STORAGE_KEY = "todos"

export function getTodosStorageMethods() {
  const localStorageIsAvaliable = testLocalStorageAvaliability().status === "sucess"
  
  if (!localStorageIsAvaliable) return {status: "error"}

  return {
    loadTodosData,
    setTodosData,
  }
}

function loadTodosData() {
  try {
    const todosData = localStorage.getItem(TODOS_STORAGE_KEY)
    
    return JSON.parse(todosData)
  }
  catch(e) {
    return {status: "parse-error"}
  }
}

function setTodosData(todosData) {
  todosData = JSON.stringify(todosData)

  try {
    localStorage.setItem(TODOS_STORAGE_KEY, todosData)
    return {status: "sucess"}
  }
  catch(e) {
    return {status: "quota-exceeded-error"}
  }
}

function testLocalStorageAvaliability() {
  try {
    if (!window.localStorage) throw new Error

    const testKey = "__storage-test__"
    
    localStorage.setItem(testKey, testKey)
    localStorage.removeItem(testKey);
  }
  catch(e) {
    return {status: "local-storage-not-supported"}
  }

  return {status: "sucess"}
}