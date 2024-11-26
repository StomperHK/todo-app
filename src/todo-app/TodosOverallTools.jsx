import { useContext, useState } from "react"

import { Button } from "../components/Button"
import { IconButton } from "../components/IconButton"
import { Filter, AlertCircle, AlertTriangle } from "react-feather"

import { ModalAndToasterContext } from "../lib/modalAndToasterContext"


export function TodosOverallTools({ deleteAllTodosDispatcher, reorderTodosDispatcher }) {
  const {showModal} = useContext(ModalAndToasterContext)

  return (
    <section className="flex justify-between items-center mb-5 max-520:justify-end" role="toolbar">
      <PrioritiesTooltip />

      <div className="flex flex-wrap gap-3 items-center">
        <DeleteAllTodos showModal={showModal} deleteAllTodosDispatcher={deleteAllTodosDispatcher} />
        <ReorderTodos reorderTodosDispatcher={reorderTodosDispatcher} />
      </div>
    </section>
  )
}

function PrioritiesTooltip() {
  const [isTooltipVisible, setIsTooltipIsVisible] = useState(false)

  return (
    <div className="relative z-10 max-520:absolute max-520:top-4 max-520:left-4 max-380:hidden">
      <IconButton onClick={() => setIsTooltipIsVisible(!isTooltipVisible)} aria-describedby="priority-tooltips" className="p-1.5 px-2 bg-zinc-900 bg-opacity-80" sm><AlertCircle /></IconButton>

      <ul role="tooltip" id="priority-tooltips" className={`${isTooltipVisible ? "opacity-1" : "opacity-0"} absolute border-2 w-44 border-zinc-500 bg-zinc-900 -top-4 left-12 rounded p-2 transition-opacity`} >
        <li className="flex items-center gap-3"> <div className="remove-invert-filter w-3 h-3 rounded-sm bg-red-500"></div> urgente</li>
        <li className="flex items-center gap-3"><div className="remove-invert-filter w-3 h-3 rounded-sm bg-yellow-400"></div> normal</li>
        <li className="flex items-center gap-3"><div className="remove-invert-filter w-3 h-3 rounded-sm bg-green-400"></div> pouco importante</li>
      </ul>
    </div>
  )
}

function DeleteAllTodos({ showModal, deleteAllTodosDispatcher }) {
  return <Button onClick={() => showModal(`Deletar tudo?`, "Quer mesmo deletar TODAS tarefas?", deleteAllTodosDispatcher)} className="text-sm py-1">resetar <AlertTriangle /></Button>
}

function ReorderTodos({ reorderTodosDispatcher}) {
  return <Button onClick={reorderTodosDispatcher} className="text-sm py-1">reordenar <Filter/></Button>
}