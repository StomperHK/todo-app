export function todosReducer(todos, action) {
  switch (action.type) {
    case "add":
      var {todoId, todoText, todoDescription, todoDate, todoDateAsMiliseconds, todoPriority} = action
      
      return [
        {todoId, todoText, todoDescription, checked: false, todoDate, todoDateAsMiliseconds, todoPriority},
        ...todos
      ]

    case "check":
      var {todoId} = action

      return todos.map(todo => todo.todoId === todoId ?  {...todo, checked: !todo.checked} : todo)

    case "edit":
      var {todoId, newTodoText, newTodoDescription, newTodoDate, newTodoDateAsMiliseconds, newTodoPriority} = action      

      return todos.map(todo => todo.todoId === todoId ? {
        ...todo, todoText: newTodoText, todoDescription: newTodoDescription, todoDate: newTodoDate, todoDateAsMiliseconds: newTodoDateAsMiliseconds, todoPriority: newTodoPriority
      } : todo)
      
    case "delete-all":
      return []

    case "delete":
      var {todoId} = action

      return todos.filter(todo => todo.todoId !== todoId)

    case "load-todos":
      const {todosData} = action

      return todosData

    case "reorder":
      let reorderedTodos = reorderTodos()

      function reorderTodos() {
        const priorityWeight = {"alto": 3, "médio": 2, "baixo": 1}
        const output = []

        todos.forEach(todo => {
          const outputIsEmpty = output.length === 0

          if (outputIsEmpty) output.push(todo)

          else {
            for (let key in output) {
              const currentTodo = output[key]
              const currentKeyIsTheLast = Number(key) == output.length-1
  
              if (priorityWeight[todo.todoPriority] >= priorityWeight[currentTodo.todoPriority]) {
                output.splice(key, 0, todo)
                break
              }
              

              if (currentKeyIsTheLast) output.push(todo)
            }
          }
        })

        return output
      }

      return reorderedTodos
  }
}