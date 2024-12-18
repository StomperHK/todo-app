import { TodosProgressAside } from "./TodoProgressAside";
import { TodosCloseToExpireAside } from "./TodosCloseToExpireAside";


export function Sidebar({ todos }) {
  return (
    <div className="sticky top-20 max-w-xl w-[280px] max-1280:w-full max-1280:static">
      <TodosProgressAside todos={todos} />
      <TodosCloseToExpireAside todos={todos} />
    </div>
  )
}
