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

      console.log(newTodoDate);
      

      return todos.map(todo => todo.todoId === todoId ? {
        ...todo, todoText: newTodoText, todoDescription: newTodoDescription, todoDate: newTodoDate, todoDateAsMiliseconds: newTodoDateAsMiliseconds, todoPriority: newTodoPriority
      } : todo)


    case "delete":
      var {todoId} = action

      return todos.filter(todo => todo.todoId !== todoId)
  }
}