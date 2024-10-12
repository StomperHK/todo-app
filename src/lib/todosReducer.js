export function todosReducer(todos, action) {
  switch (action.type) {
    case "add":
      var {todoId, todoText, todoDescription} = action
      
      return [...todos, {todoId, todoText, todoDescription, checked: false}]

    case "check":
      var {todoId} = action

      return todos.map(todo => todo.todoId === todoId ?  {...todo, checked: !todo.checked} : todo)

    case "edit":
      var {todoId, newTodoText, newTodoDescription} = action

      console.log(newTodoText);
      
      

      return todos.map(todo => todo.todoId === todoId ? {...todo, todoText: newTodoText, todoDescription: newTodoDescription} : todo)


    case "delete":
      var {todoId} = action
      

      return todos.filter(todo => todo.todoId !== todoId)

  }
}