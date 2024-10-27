import { Activity } from "react-feather";


function TodosProgressBar({ todos }) {
  const completedTodos = todos.reduce((accum, todo) => todo.checked ? accum + 1 : accum, 0)
  const todosAmount = todos.length
  const completedTodosPercentage = `${completedTodos/todosAmount * 100}%`

  return (
    <div className="flex items-center gap-2 mt-3" role="progressbar" aria-label="tarefas concluídas" aria-valuemax="0" aria-valuemin={todosAmount} aria-valuetext="completedTodosPercentage">
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

export function TodosProgressAside({ todos }) {
  const thereAreNoTodos = todos.length === 0

  return (
    <aside aria-label="Quantas tarafas estão concluídas" className="mb-4 p-3 min-h-[108px] border-2 border-zinc-500 rounded-md bg-zinc-800 shadow-normal">
      <h2 className="mb-2 text-2xl">Progresso</h2>

      {
        thereAreNoTodos ?
        <p className="text-zinc-300">
          Crie tarefas para monitorar seu progresso.
        </p> :
        <TodosProgressBar todos={todos} />
      }
    </aside>
  )
}