export function todosReducer(todos, action) {
  switch (action.type) {
    case "add":
      var {todoId, todoText} = action
      
      return [...todos, {todoId, todoText, checked: false}]

    case "check":
      var {todoId} = action

      return todos.map(todo => todo.todoId === todoId ?  {...todo, checked: !todo.checked} : todo)

  }
}