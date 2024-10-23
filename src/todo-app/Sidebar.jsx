import { TodosProgressAside } from "./TodoProgressAside";
import { TodosCloseToExpireAside } from "./TodosCloseToExpireAside";


export function Sidebar({ todos }) {
  return (
    <aside className="sticky top-20 max-w-xl w-[280px] max-1280:w-[90svw]">
      <TodosProgressAside todos={todos} />
      <TodosCloseToExpireAside todos={todos} />
    </aside>
  )
}
