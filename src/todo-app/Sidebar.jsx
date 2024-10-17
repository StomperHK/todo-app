import { Activity } from "react-feather";


function TodosProgressBar({ todos }) {
  const completedTodos = todos.reduce((accum, todo) => todo.checked ? accum + 1 : accum, 0)
  const todosAmount = todos.length
  const completedTodosPercentage = `${completedTodos/todosAmount * 100}%`

  return (
    <div className="flex items-center gap-2 mt-3" role="progressbar" aria-label="tarefas concluídas" aria-valuenow="completedTodosPercentage">
      <Activity />

      <div className="w-full h-1 bg-zinc-600 overflow-hidden relative">
        <div style={{transform: `translateX(${completedTodosPercentage})`}} className="w-full h-1 bg-zinc-200 transition-transform absolute top-0 right-full"></div>
      </div>

      <span className="p-1 bg-zinc-600 rounded font-monospace">
        {completedTodos}/{todosAmount}
      </span>
    </div>
  )
}

export function Sidebar({ todos }) {
  const thereAreNoTodos = todos.length === 0

  return (
    <aside className="max-w-xl w-[240px] mb-4 p-4 border-2 border-zinc-500 absolute top-0 left-0 -translate-x-[110%] rounded-md bg-zinc-800 shadow-normal max-1280:w-[90svw] max-1280:static max-1280:-translate-x-0">
      <div>
        <h2 className="mb-2 text-3xl">Progresso</h2>

        {
          thereAreNoTodos ?
          <p className="text-zinc-300">
            Crie tarefas para monitorar seu progresso.
          </p> :
          <TodosProgressBar todos={todos} />
        }
      </div>
    </aside>
  )
}