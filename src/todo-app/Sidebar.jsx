import { TodosProgressAside } from "./TodoProgressAside";
import { TodosCloseToExpireAside } from "./TodosCloseToExpireAside";


export function Sidebar({ todos }) {
  return (
    <aside className="max-w-xl w-[280px] absolute top-0 left-0 -translate-x-[110%] max-1280:w-[90svw] max-1280:static max-1280:-translate-x-0">
      <TodosProgressAside todos={todos} />
      <TodosCloseToExpireAside todos={todos} />
    </aside>
  )
}
