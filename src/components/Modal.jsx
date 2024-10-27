import { useRef, useEffect } from "react";

import { Button } from "./Button";
import { IconButton } from "./IconButton";
import { X } from "react-feather";

import styles from "./css/modal.module.css";


export function Modal({ modalState: {isVisible, title, description, action}, setModalState }) {
  const dialogRef = useRef(null)

  const {modal} = styles

  useEffect(showModal)

  function showModal() {
    if (isVisible) {
      dialogRef.current.showModal()
    }
    else {
      dialogRef.current.close()
    }
  }

  function closeModal() {
    setModalState(modalState => ({...modalState, isVisible: false}))
  }

  function executeActionAndCloseModal() {
    action()
    closeModal()
  }
  

  return (
    <div className={`${modal} w-full h-full fixed top-0 left-0 bg-black bg-opacity-30`}>
      <dialog ref={dialogRef} aria="deletar tarefa?" className="w-[400px] border-2 border-zinc-500 p-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded bg-zinc-700 max-520:w-[280px] max-520:p-3">
        <div className="header flex justify-between items-center mb-5 pb-5 border-b-2 border-zinc-400 max-520:mb-3 max-520:pb-3">
          <h2 className="text-xl text-current">{title}</h2>
          <IconButton onClick={closeModal} sm aria-label="fechar modal de aviso" className="p-1 border-transparent bg-zinc-500 rounded active:bg-zinc-500">
            <X size={20} />
          </IconButton>
        </div>

        <p className="mb-4">{description}</p>

        <div className="flex justify-end gap-3">
          <Button onClick={closeModal} className="py-1 bg-zinc-800">cancelar</Button>
          <Button onClick={executeActionAndCloseModal} className="py-1 bg-zinc-800">excluir</Button>
        </div>
      </dialog>
    </div>
  )
}